import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './CreateCardForm.module.css';
import {validateImageUrl} from '../../utils/validateImageUrl.ts';
import {useNavigate} from 'react-router';
import {useAppDispatch} from '../hooks/useAppDispatch.ts';
import {addProductAC} from '../../../slice/products-slice.ts';
import {nanoid} from '@reduxjs/toolkit';


export type FormData = {
    title: string;
    description: string;
    imageUrl: string;
    avatarUrl: string;

};

export const CreateCardForm = () => {
const navigate = useNavigate();
const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm<FormData>();

    const [imageUrl, avatarUrl] = watch(['imageUrl', 'avatarUrl']);




    const onSubmit: SubmitHandler<FormData> = (data,) => {

        console.log('Form data:', {
            ...data
        });
        dispatch(addProductAC({
            formData: {
                ...data,
                numberLike: 0,
                like: false,
                id:nanoid()
            }
        }));
        setTimeout(() => {
            navigate('/products');
            reset();
        }, 100);
    };




    return (
        <div className={styles.formContainer}>
            <h2 className={styles.formTitle}>Create a new card</h2>

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.label}>
                        Name*
                        {errors.title && <span className={styles.error}> {errors.title.message}</span>}
                    </label>
                    <input
                        id="title"
                        className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                        placeholder="Enter a name"
                        {...register('title', {
                            required: 'This field is required',
                            minLength: {
                                value: 3,
                                message: 'Minimum 3 characters'
                            }
                        })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}>
                        Description
                        {errors.description && <span className={styles.error}> {errors.description.message}</span>}
                    </label>
                    <textarea
                        id="description"
                        className={`${styles.textarea} ${errors.description ? styles.inputError : ''}`}
                        placeholder="Add a description"
                        rows={4}
                        {...register('description', {
                            maxLength: {
                                value: 200,
                                message: 'Maximum 200 characters'
                            }
                        })}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="avatarUrl" className={styles.label}>
                        Link to avatar
                        {errors.avatarUrl && <span className={styles.error}> {errors.avatarUrl.message}</span>}
                    </label>
                    <input
                        id="avatarUrl"
                        type="url"
                        className={`${styles.input} ${errors.avatarUrl ? styles.inputError : ''}`}
                        placeholder="https://example.com/avatar.jpg"
                        {...register('avatarUrl', {
                            validate: (value) => validateImageUrl(value, true)
                        })}
                    />
                    {avatarUrl && !errors.avatarUrl && (
                        <div className={styles.avatarPreview}>
                            <img
                                src={avatarUrl}
                                alt="Avatar preview"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="imageUrl" className={styles.label}>
                        Image Link*
                        {errors.imageUrl && <span className={styles.error}> {errors.imageUrl.message}</span>}
                    </label>
                    <input
                        id="imageUrl"
                        type="url"
                        className={`${styles.input} ${errors.imageUrl ? styles.inputError : ''}`}
                        placeholder="https://example.com/image.jpg"
                        {...register('imageUrl', {
                            validate: (value) => validateImageUrl(value)
                        })}
                    />
                    {imageUrl && !errors.imageUrl && (
                        <div className={styles.imagePreview}>
                            <img
                                src={imageUrl}
                                alt="Preview"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                }}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.formActions}>
                    <button type='submit' className={styles.submitButton}>
                        Создать карточку
                    </button>
                    <button
                        type="button"
                        className={styles.cancelButton}
                        onClick={() => reset()}
                    >
                        Очистить форму
                    </button>
                </div>
            </form>
        </div>
    );
};