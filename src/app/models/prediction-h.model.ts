import { PredictionD } from "./prediction-d.model"

export class PreidictionH {
    id: number
    uploaded_folder_name: string
    total_images: number
    benign_count: number
    malignant_count: number
    normal_count: number
    date: Date
    details: PredictionD[]
    pretrained_model_id: number
    pretrained_model_name?: string
}