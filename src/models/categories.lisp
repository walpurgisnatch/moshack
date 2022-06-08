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
            :category++
            :category-id
            :delete-category))

(in-package :moshack.categories)


(defun get-category (id)
  (find-where categories (:= :id id)))

(defun get-categories (&key (name "") (limit 100) (offset 0))
  (find-where categories (:like :name (wildcard name)) :limit limit :offset offset))

(defun category-id (name)
  (cadr (select-where categories (:= :name name) :id)))

(defun create-category (name)
  (handler-case 
      (retrieve-one
       (insert-into :categories
         (set= :name name
               :items_count 0
               :created_at (local-time:now)
               :updated_at (local-time:now))
         (returning :id)))
    (error (e) e)))

(defun update-category (id name)
  (execute 
   (update :categories
     (set= :name name                 
           :updated_at (local-time:now))
     (where (:= :id id)))))

(defun category++ (id)
  (execute 
   (update :categories
     (set= :items_count (:+ :items_count 1)
           :updated_at (local-time:now))
     (where (:= :id id)))))

(defun count-items ()
  (cadr (retrieve-one
         (select (fields (:sum :items_count))
           (from :categories)))))

(defun delete-category (id)
  (execute 
   (delete-from :categories
     (where (:= :id id)))))
