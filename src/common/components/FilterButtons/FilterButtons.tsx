import styles from './filterButtons.module.css';
import {filterAllAC, filterFavoriteAC} from '../../../slice/products-slice.ts';
import {useAppDispatch} from '../hooks/useAppDispatch.ts';
import {selectApp, setFilterAC} from '../../../slice/app-slice.ts';
import {useSelector} from 'react-redux';
import {Link} from 'react-router';

type PropsType = {

}

export const FilterButtons = ({

                              }: PropsType) => {
    const app = useSelector(selectApp);
    const dispatch = useAppDispatch()
    const onFavoriteClickHandler = () => {
        dispatch(setFilterAC({filter: 'favorite'}))
        dispatch(filterFavoriteAC())
    }
    const onAllClickHandler = () => {
        dispatch(setFilterAC({filter: 'all'}))
        dispatch(filterAllAC())
    }
    return (
        <div className={styles.buttonsContainer}>
            <button
                className={`${styles.button} ${styles.allButton} ${app.filter === 'all' ? styles.active : ''}`}
                onClick={onAllClickHandler}
                aria-label="Show all"
            >
                <span className={styles.buttonIcon}>☰</span>
                <span className={styles.buttonText}>All</span>
            </button>
            <button
                className={`${styles.button} ${styles.favoritesButton} ${app.filter === 'favorite' ? styles.favorited : ''}`}
                onClick={onFavoriteClickHandler}
                aria-label={app.filter === 'favorite' ? 'Remove from favorites' : 'Add to favorites'}
            >
                <span className={styles.buttonIcon}>♥</span>
                <span className={styles.buttonText}>
          {app.filter === 'favorite' ? 'Favorited' : 'Favorites'}
        </span>
            </button>

            <Link to={'/CreateCardForm'}
                className={`${styles.button} ${styles.addButton}`}
                aria-label={'Add'}
            >
                <span className={styles.buttonIcon}>+</span>
                <span className={styles.buttonText}>
          Add
        </span>
            </Link>


        </div>
    );
};