(in-package :cl-user)
(defpackage moshack.categories
  (:use :cl
        :moshack.models
        :sxql
        :datafly
        :moshack.utils)
  (:export  :get-categories
            :get-category
            :create-category
            :update-category
            :delete-category))

(in-package :moshack.categories)


(defun get-category (id)
  (find-where categories (:= :id id)))

(defun get-categories (&optional (name ""))
  (find-where categories (:like :name (wildcard name))))

(defun create-category (name)
  (handler-case 
      (retrieve-one
       (insert-into :categories
                    (set= :name name
                          :created_at (local-time:now)
                          :updated_at (local-time:now))
                    (returning :id)))
    (error (e) e)))

(defun update-category (name)
  (execute 
   (update :categories
           (set= :name name
                 :updated_at (local-time:now))
                 (where (:= :id id))))))

(defun delete-category (id)
  (execute 
   (delete-from :categories
                (where (:= :id id)))))
