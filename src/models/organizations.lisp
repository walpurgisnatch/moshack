(in-package :cl-user)
(defpackage moshack.organizations
  (:use :cl
        :moshack.models
        :sxql
        :datafly
        :moshack.utils)
  (:export  :get-organizations
            :get-organization
            :create-organization
            :update-organization
            :delete-organization))

(in-package :moshack.organizations)

(defun get-organization (id)
  (let ((organization (car (find-where organizations (:= :id id)))))
    (setf (organizations-items-count organization) (length (organizations-items organization)))
    organization))

(defun get-organizations (&key (name "") (limit 100) (offset 0))
  (find-where organizations (:like :name (wildcard name)) :limit limit :offset offset))

(defun create-organization (name description address inn website)
  (handler-case 
      (retrieve-one
       (insert-into :organizations
         (set= :name name
               :description description
               :address address
               :inn inn
               :website website
               :created_at (local-time:now)
               :updated_at (local-time:now))
         (returning :id)))
    (error (e) e)))

(defun update-organization (id name address inn website)
  (execute 
   (update :organizations
     (set= :name name
           :address address
           :inn inn
           :website website
           :updated_at (local-time:now))
     (where (:= :id id)))))

(defun delete-organization (id)
  (execute 
   (delete-from :organizations
     (where (:= :id id)))))
