(in-package :cl-user)
(defpackage moshack.parser
  (:use :cl :stepster))

(in-package :moshack.parser)

(setf x (ss:parse "https://productcenter.ru/producers/r-moskovskaia-obl-191/c-moskva-3109?sorttype=alphabet"))

(ss:collect-from x 'div :test #'(lambda (n a) (equal (ss:attribute n 'class) a)) :test-args '("ci_main"))

(setf producers (ss:extract-urls x #'(lambda (q y) (substp y q)) "/producers/"))

(setf name (ss:text page 'h1)
(setf description (ss:text page 'div :test (ss:check-attr 'class) :test-args "iv_text"))))
(setf category (plump:text (nth 4 (ss:collect-from page 'li :test (ss:check-attr 'itemtype) :test-args "http://schema.org/ListItem"))))
(setf address (ss:text page 'td :test (ss:check-attr 'itemprop) :test-args "address"))
(setf website (ss:text page 'a :test (ss:check-attr 'itemprop) :test-args "url"))
(setf phone (ss:text page 'span :test (ss:check-attr 'itemprop) :test-args "telephone"))

(setf td (loop for q in (ss:collect-from page 'tr)
               collect (ss:collect-from q 'td)))
(loop for (f . s) in td
      if (equal (plump:text f) "ИНН")
        return (plump:text (car s)))
(loop for (f . s) in td
      if (equal (plump:text f) "Юридический адрес")
        return (plump:text (car s)))

(setf price (ss:text item 'div :test (ss:check-attr 'class) :test-args "price"))))
