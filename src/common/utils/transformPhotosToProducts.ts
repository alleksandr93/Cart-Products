import type {BaseResponce, ProductsType} from '../../types/types.ts';

export const transformPhotosToProducts = (photos: BaseResponce): ProductsType[] => {
    return photos.map((photo) => ({
        id: photo.id,
        nameUser: photo.user.name,
        urlImg: photo.urls.small,
        urlDescription: photo.alt_description || 'Описание отсутствует',
        photoUserProfile: photo.user.profile_image.small,
        numberLike: photo.likes,
        like:false
    }));
};