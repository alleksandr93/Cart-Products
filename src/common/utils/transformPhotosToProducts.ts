import type {BaseResponce, ProductsType} from '../../types/types.ts';

export const transformPhotosToProducts = (photos: BaseResponce): ProductsType[] => {
    return photos.map((photo) => ({
        id: photo.id,
        title: photo.user.name,
        imageUrl: photo.urls.small,
        description: photo.alt_description || 'Описание отсутствует',
        avatarUrl: photo.user.profile_image.small,
        numberLike: photo.likes,
        like:false
    }));
};