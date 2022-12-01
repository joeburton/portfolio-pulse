import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import ImagePreview from './ImagePreview';
import { useAppContext } from '../store';

import styles from '../css/ItemForm.module.css';

const editValidationSchema = Yup.object().shape({
  logo: Yup.mixed().required(),
  class: Yup.mixed().required(),
  role: Yup.mixed().required(),
  company: Yup.mixed().required(),
  skills: Yup.mixed().required(),
  description: Yup.mixed().required(),
});

const handleUpload = async (values: any, id: string | undefined) => {
  const url = id ? '/api/update-item' : '/api/add-item';
  const formData = new FormData();

  if (id) {
    formData.append('_id', id);
  }

  console.log(values.logo);
  formData.append('logo', values.logo);
  formData.append('class', values.class);
  formData.append('role', values.role);
  formData.append('company', values.company);
  formData.append('skills', values.skills);
  formData.append('description', values.description);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  return await response.json();
};

const ItemForm = (props: { id?: string }) => {
  const { state, dispatch, ACTIONS } = useAppContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const items = state.items;

  const itemToEdit = items.filter((item) => item._id === props.id);

  const item = itemToEdit.length > 0 ? itemToEdit[0] : {};

  return (
    <div className={styles['form-container']} data-testid='add-item'>
      <Formik
        initialValues={{
          logo: '',
          class: item?.class ? item.class : '',
          role: item?.role ? item.role : '',
          company: item?.company ? item.company : '',
          skills: item?.skills ? item.skills : '',
          description: item?.description ? item.description : '',
        }}
        validationSchema={editValidationSchema}
        onSubmit={async (values: any, { resetForm }) => {
          const id = item?._id;
          const data = await handleUpload(values, id);
          if (data) {
            dispatch({ type: ACTIONS.UPDATE_ITEMS, payload: data });
            setIsSubmitted(true);
            resetForm({});
          }
        }}
      >
        {({ isSubmitting, setFieldValue, values }: any) => (
          <Form>
            <fieldset>
              <legend>{item._id ? `Edit` : `Add`} Item</legend>
              {isSubmitted && (
                <p className={styles['form-submitted']}>
                  Data successfully submitted,{' '}
                  {!item._id && (
                    <span onClick={() => setIsSubmitted(false)}>
                      return to add item form.
                    </span>
                  )}
                  {item._id && (
                    <span
                      onClick={() => {
                        dispatch({
                          type: ACTIONS.SET_EDIT_ITEM_ID,
                          payload: '',
                        });
                      }}
                    >
                      return to item list.
                    </span>
                  )}
                </p>
              )}
              {!isSubmitted && (
                <>
                  <div className={styles['form-group']} data-testid='image'>
                    <label htmlFor='logo'>Upload image</label>
                    <input
                      id='logo'
                      name='logo'
                      type='file'
                      data-testid='upload-image'
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (e.currentTarget.files) {
                          setFieldValue('logo', e.currentTarget.files[0]);
                        }
                      }}
                      className='form-control'
                    />
                    {item._id && !values.logo && (
                      <img
                        src={`../images/${item.logo}`}
                        height={40}
                        data-testid='saved-image'
                        alt={item.company}
                      />
                    )}
                    {values.logo && <ImagePreview file={values.logo} />}
                    <ErrorMessage
                      className={styles['error-message']}
                      component='div'
                      name='logo'
                    />
                  </div>
                  <div
                    className={styles['form-group']}
                    data-testid='class-name'
                  >
                    <label htmlFor='class'>Image class name</label>
                    <Field name='class' />
                    <ErrorMessage
                      className={styles['error-message']}
                      component='div'
                      name='class'
                    />
                  </div>
                  <div className={styles['form-group']} data-testid='role'>
                    <label htmlFor='role'>Role</label>
                    <Field name='role' />
                    <ErrorMessage
                      className={styles['error-message']}
                      component='div'
                      name='role'
                    />
                  </div>
                  <div className={styles['form-group']} data-testid='company'>
                    <label htmlFor='company'>Company</label>
                    <Field name='company' />
                    <ErrorMessage
                      className={styles['error-message']}
                      component='div'
                      name='company'
                    />
                  </div>
                  <div className={styles['form-group']} data-testid='skills'>
                    <label htmlFor='skills'>Skills used</label>
                    <Field name='skills' />
                    <ErrorMessage
                      className={styles['error-message']}
                      component='div'
                      name='skills'
                    />
                  </div>
                  <div
                    className={styles['form-group']}
                    data-testid='description'
                  >
                    <label htmlFor='description'>Description</label>
                    <Field as='textarea' name='description' />
                    <ErrorMessage
                      className={styles['error-message']}
                      component='div'
                      name='description'
                    />
                  </div>
                  <button type='submit' disabled={isSubmitting ? true : false}>
                    Submit
                  </button>
                </>
              )}
            </fieldset>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ItemForm;
