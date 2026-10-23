"""Fine-tune YOLO on the public double-six domino whole-tile dataset.

Run after ai-training/download_dataset.py. Roboflow's exported dataset/data.yaml
is authoritative for the annotation class order; this script validates its presence.
"""
from pathlib import Path
from ultralytics import YOLO

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "dataset" / "data.yaml"

if not DATA.exists():
    raise SystemExit(
        "Dataset config not found. First run: python ai-training/download_dataset.py"
    )

model = YOLO("yolo11n.pt")
model.train(
    data=str(DATA),
    epochs=80,
    imgsz=640,
    batch=8,
    patience=15,
    project=str(ROOT / "ai-training" / "runs"),
    name="domino-whole-tile-28",
)
