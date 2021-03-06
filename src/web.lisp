(in-package :cl-user)
(defpackage moshack.web
  (:use :cl
        :caveman2
        :moshack.config
        :moshack.view
        :moshack.db
        :datafly
        :sxql
        :moshack.utils
        :moshack.models
        :moshack.categories
        :moshack.organizations
        :moshack.items)
  (:export :*web*))
(in-package :moshack.web)

;; for @route annotation
(syntax:use-syntax :annot)

;;
;; Application

;(datafly:connect-toplevel :postgres :database-name "moshack" :username "moshack" :password "moshack")
;(setf datafly:*connection* nil)

(defclass <web> (<app>) ())
(defvar *web* (make-instance '<web>))
(defmethod lack.component:call :around ((app <web>) env)
  (let ((datafly:*connection*
          (apply #'datafly:connect-cached (cdr (assoc :maindb (config :databases))))))
    (prog1
        (call-next-method))))
(clear-routing-rules *web*)


;;
;; Routing rules

(defroute "/api/*" ()
  (setf (getf (response-headers *response*) :Access-Control-Allow-Origin) "*")
  (next-route))

(defroute ("/api/*" :method :POST) ()
  (setf (getf (response-headers *response*) :Access-Control-Allow-Origin) "*")
  (next-route))

(defroute ("/api/*" :method :DELETE) ()
  (setf (getf (response-headers *response*) :Access-Control-Allow-Origin) "*")
  (next-route))

(defroute ("/api/*" :method :PUT) ()
  (setf (getf (response-headers *response*) :Access-Control-Allow-Origin) "*")
  (next-route))

(defroute ("/*" :method :OPTIONS) ()
  (setf (getf (response-headers *response*) :Access-Control-Allow-Origin) "*")
  (setf (getf (response-headers *response*) :Access-Control-Allow-Headers) "*")
  (setf (getf (response-headers *response*) :Access-Control-Allow-Methods) "*")  
  (next-route))

(defroute "/api/categories" ()
  (render-json (get-categories)))

(defroute "/api/category/:category" (&key category)
  (render-json (find-where items (:= :category (category-id category)))))

(defroute "/api/organizations" ()
  (render-json (get-organizations)))

(defroute "/api/organizations/:id" (&key id)
  (let ((organization (get-organization id)))
    (render-json `(:organization ,(get-organization id) :items ,(organizations-items organization)))))

(defroute "/api/items" (&key (|statement| :and) |name| |price| (|limit| 100) (|offset| 0) (|order-by| `(:desc :created_at)))
  (render-json (get-items :statement |statement| :name |name| :price |price| :limit |limit| :offset |offset| :order-by |order-by|)))

(defroute "/api/items/:id" (&key id)
  (render-json (get-item id)))

(defroute "/" ()
  (render #P"index.html"))

;;
;; Error pages

(defmethod on-exception ((app <web>) (code (eql 404)))
  (declare (ignore app))
  (merge-pathnames #P"_errors/404.html"
                   *template-directory*))

(defmethod on-exception ((app <web>) (code (eql 400)))
  (declare (ignore app))
  (render-json '("Wrong arguments.")))

(defmethod on-exception ((app <web>) (code (eql 403)))
  (declare (ignore app))
  (render-json '("Not authorized.")))
