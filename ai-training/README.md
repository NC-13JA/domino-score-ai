# Domino Score AI — dataset and model training

## Selected public dataset

- Project: https://universe.roboflow.com/proyect-train/domino-5
- The public page currently lists 5,758 images, 28 whole-tile classes, and CC BY 4.0. A version listing reports version 1 with 5,598 images; the exact exported version may differ.
- Attribute the source in any redistributed dataset/model documentation and re-check the dataset's license and terms before publishing.

## Download from a phone or computer

The files are not stored in this Git repository because image datasets are large and the export requires a Roboflow API key. Run these commands in Termux, a computer, or a cloud notebook:

```bash
python -m pip install roboflow ultralytics
export ROBOFLOW_API_KEY="YOUR_PRIVATE_KEY"
python ai-training/download_dataset.py
python ai-training/train.py
```

Keep the API key private. Do not paste it into GitHub, source files, screenshots, or chat. On Android/Termux, package availability and training performance may vary; Google Colab is usually more practical for training.

The downloader uses the Roboflow Python SDK to export version 1 as YOLO format. The downloaded `dataset/data.yaml` is authoritative for class IDs. Inspect it before training and verify that its train/validation paths and class names match the downloaded labels.

## What this model learns

This dataset labels each *whole domino tile* as one of 28 combinations (0-0 through 6-6). It does **not** label each half as one of seven pip values. This is still useful for recognizing the value of a complete tile, but it is a different task from detecting each half independently. The app's current scanner is not automatically changed by training this model.

## After training

The best weights are written to `ai-training/runs/domino-whole-tile-28/weights/best.pt`. Validate on held-out photos captured with the target Android phone, including varied angles, lighting, surfaces, and occlusions. Only then export, for example:

```bash
yolo export model=ai-training/runs/domino-whole-tile-28/weights/best.pt format=onnx imgsz=640
```

ONNX export is only a model-format step; the Android app still needs a compatible inference runtime, preprocessing/postprocessing, class mapping, and tests before it can use the model. Do not claim the model is integrated until those changes are implemented and the APK is tested.

## Privacy and licensing

Do not upload personal photos automatically. Keep the dataset source attribution and license information with any redistributed derivatives. Review the dataset provider's current terms and the model/library licenses before distributing a commercial app.
