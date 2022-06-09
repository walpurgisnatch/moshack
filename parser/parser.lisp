(in-package :cl-user)
(defpackage moshack.parser
  (:use :cl :stepster))

(in-package :moshack.parser)

(setf x (ss:parse "https://productcenter.ru/producers/r-moskovskaia-obl-191/c-moskva-3109?sorttype=alphabet"))


(setf producers (ss:extract-urls x #'(lambda (q y) (substp y q)) "/producers/"))

(defun producers-links (page)
  (ss:extract-urls page #'(lambda (q y) (and (substp y q) (not (substp q "/page-")))) "/producers/"))

(defun from-table (page attr)
  (let ((tds (loop for td in (ss:collect-from page 'tr)
                   collect (ss:collect-from td 'td))))
    (loop for (key . val) in tds
          if (equal (plump:text key) attr)
            return (plump:text (car val)))))

(defun text (page selector attr val)
  (plump:text (ss:node-with-attr page selector attr val)))

(defun parse-organization (page)
  (let ((name (ss:text page 'h1))
         (description (text page 'div 'class "iv_text"))
         (category (plump:text (nth 4 (ss:collect-from page 'li :test (ss:check-attr 'itemtype) :test-args "http://schema.org/ListItem"))))
         (address (text page 'td 'itemprop "address"))
         (website (text page 'a 'itemprop "url"))
         (phone (text page 'span 'itemprop "telephone"))
         (inn (from-table page "ИНН")))
    (list name description category address website phone inn)))

(defun parse-item (page)
  (let ((name (ss:text page 'h1))
        (description (text page 'div 'class "iv_text"))
        (price (text page 'div 'class "price")))
    (list name description price)))

(setf price (ss:text item 'div :test (ss:check-attr 'class) :test-args "price"))))
