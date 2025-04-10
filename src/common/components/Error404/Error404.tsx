
import styled from './error404.module.css'
import {Link} from 'react-router';

export const Error404 = () => {
    return (
        <div className={'body'}>
            <div className={styled.errorContainer}><h1>404</h1>
                <h2>Страница не найдена</h2>
                <p>К сожалению, запрашиваемая страница не существует. Возможно, она была удалена или вы ошиблись в
                    адресе.</p>
                <Link to={'/'}>Вернуться на главную</Link>
            </div>
        </div>
    );
};