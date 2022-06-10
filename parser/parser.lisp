(in-package :cl-user)
(defpackage moshack.parser
  (:use :cl :stepster))

(in-package :moshack.parser)

(defparameter *headers* '(("User-Agent" . "Mozilla/5.0 (X11; Linux x86_64; rv:96.0) Gecko/20100101 Firefox/96.0") ("Cookie . baner_views_70=3; baner_views_71=3; baner_counter_5=1; baner_counter_8=2; items_on_page=48")))

(defparameter *main-link* "https://productcenter.ru/producers/r-moskovskaia-obl-191/c-moskva-3109/page-")

(defun substp (regex string)
  (cl-ppcre:scan-to-strings regex string))

(defun prod-link (string q)
  (substp "\/producers\/[0-9]*?\/[a-zA-Z]" string))

(defun make-producers-link (page)
  (concatenate 'string *main-link* (write-to-string page)))

(defun organization-items-link (page)
  (ss:prepare-url (ss:find-by-text page "Смотреть всё" :attr 'href) *main-link*))

(defun producers-links (page)
  (remove-duplicates (ss:extract-urls (ss:parse (make-producers-link page)  :headers *headers*) #'prod-link) :test #'string=))

(defun producers (&optional (n 63))
  (loop for i from 1 to n do (sleep 1) collect (producers-links (ss:parse (concatenate 'string *main-link* (write-to-string i)) :headers *headers*))))

(defun from-table (page attr)
  (let ((tds (loop for td in (ss:collect-from page 'tr)
                   collect (ss:collect-from td 'td))))
    (loop for (key . val) in tds
          if (equal (plump:text key) attr)
            return (plump:text (car val)))))

(defun text (page selector attr val)
  (handler-case
      (plump:text (ss:node-with-attr page selector attr val))
    (error (e) nil)))

(defun organization-items-links (org-page)
  (let ((page (ss:parse (organization-items-link org-page) :headers *headers*)))
    (remove-duplicates
     (ss:collect-from
      page 'a
      :attr 'href
      :test #'(lambda (node q)
                (and (substp "\/products\/[0-9]*?\/[a-zA-Z]"
                             (ss:attribute node 'href))
                     (not (equal (ss:attribute node 'rel) "nofollow"))
                     (not (substp "sbb_offer" (ss:attribute node 'class))))))
     :test #'string=)))

(defun parse-organization (page)
  (let ((name (ss:text page 'h1))
        (description (text page 'div 'class "iv_text"))
        (category (plump:text (nth 4 (ss:collect-from page 'li :test (ss:check-attr 'itemtype) :test-args "http://schema.org/ListItem"))))
        (address (text page 'td 'itemprop "address"))
        (website (text page 'a 'itemprop "url"))
        (phone (text page 'span 'itemprop "telephone"))
        (inn (from-table page "ИНН")))
    (list name description category address website phone inn)))

(defun parse-items (org)
  (loop for item in (organization-items-links org) do (sleep .5)
        collect (parse-item (ss:parse (ss:prepare-url item *main-link*)))))

(defun parse-item (page)
  (let ((name (ss:text page 'h1))
        (description (text page 'div 'class "iv_text"))
        (category (plump:text (nth 4 (ss:collect-from page 'li :test (ss:check-attr 'itemtype) :test-args "http://schema.org/ListItem"))))
        (sub-category (plump:text (nth 5 (ss:collect-from page 'li :test (ss:check-attr 'itemtype) :test-args "http://schema.org/ListItem"))))
        (price (text page 'div 'class "price")))
    (list name description category sub-category price)))

