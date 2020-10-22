import Orphanage from '../models/Orphanage';
import imagesView from './images_view';

export default {
    render(orphanage: Orphanage) {
        if(!orphanage.is_approved) {
            return {
                id: orphanage.id,
                name: orphanage.name,
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
                about: orphanage.about,
                whatsapp_number: orphanage.whatsapp_number,
                instructions: orphanage.instructions,
                opening_hours: orphanage.opening_hours,
                open_on_weekends: orphanage.open_on_weekends,
                images: imagesView.renderMany(orphanage.images)
            };
        }
    },

    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
};