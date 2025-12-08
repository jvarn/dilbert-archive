# Year-by-Year Sentiment Analysis

This module performs sentiment analysis on Dilbert comic transcripts using a pre-trained Hugging Face model. It aggregates sentiment scores by year and generates visualizations showing how the sentiment of Dilbert comics has changed over time (1989-2023).

## What This Module Does

- Loads the existing Dilbert transcript JSON dataset from the main repository (no duplication)
- Computes sentiment for each comic using a ready-made sentiment analysis model
- Aggregates sentiment scores by year
- Saves results to a CSV file
- Generates a line chart visualization showing sentiment trends over time

## Setup Instructions

### Prerequisites

- **Python 3.8 or higher** (Python 3.9+ recommended)
- A virtual environment (recommended to isolate dependencies)

### Step 1: Create and Activate a Virtual Environment

```bash
# Navigate to the project root
cd /path/to/dilbert-transcripts

# Create a virtual environment
python3 -m venv venv

# Activate it
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate
```

### Step 2: Install Dependencies

```bash
pip install pandas matplotlib transformers torch
```

**Note:** The `transformers` library requires PyTorch (`torch`), which may take a few minutes to install. On first run, the sentiment model will be downloaded automatically (about 250MB).

### Step 3: Run the Analysis

```bash
# Make sure you're in the project root
cd /path/to/dilbert-transcripts

# Run the script
python analysis/yearly_sentiment/yearly_sentiment.py
```

The script will:
1. Load the dataset from `data/dilbert_comics_transcripts.json`
2. Process each comic through the sentiment analyzer (this takes several minutes)
3. Generate output files in the `analysis/yearly_sentiment/` directory

## Expected Outputs

After running the script, you'll find two files in `analysis/yearly_sentiment/`:

1. **`yearly_sentiment.csv`** - A CSV file with columns:
   - `year`: The year (1989-2023)
   - `mean_sentiment`: Average sentiment score for that year (ranges from -1.0 to +1.0)
   - `comic_count`: Number of comics analyzed for that year

2. **`yearly_sentiment.png`** - A line chart visualization showing:
   - X-axis: Years from 1989 to 2023
   - Y-axis: Average sentiment (positive values = positive sentiment, negative values = negative sentiment)
   - A horizontal line at y=0 indicating neutral sentiment

## How It Works

### Dataset Structure

The script reads from `data/dilbert_comics_transcripts.json`, which has this structure:

```json
{
  "1989-04-16": {
    "transcript": "FULL TEXT OF THE COMIC...",
    "title": "...",
    ...
  },
  ...
}
```

The script extracts the date (from the key) and transcript text (from the `transcript` field) for each comic.

### Sentiment Model

This module uses the **distilbert-base-uncased-finetuned-sst-2-english** model from Hugging Face:
- Pre-trained on the Stanford Sentiment Treebank (SST-2)
- No training required - ready to use out of the box
- Returns labels ("POSITIVE" or "NEGATIVE") and confidence scores
- Scores are converted to a -1.0 to +1.0 scale for easier interpretation

### Processing Time

- **First run**: May take 10-15 minutes (model download + processing ~12,000 comics)
- **Subsequent runs**: 5-10 minutes (model is cached, only processing needed)

Progress is shown every 100 comics processed.

## Troubleshooting

### "Dataset not found" Error

Make sure you're running the script from the project root directory, and that `data/dilbert_comics_transcripts.json` exists.

### Out of Memory Errors

If you encounter memory issues, you can modify the script to process comics in batches. The current implementation processes one at a time, which is memory-efficient but slower.

### Model Download Issues

If the model fails to download, check your internet connection. The model is downloaded automatically on first use and cached for future runs.

## Using the Results

The CSV file can be imported into:
- Excel or Google Sheets for further analysis
- Python pandas for additional processing
- R or other statistical tools

The visualization can be used in:
- Presentations
- Reports
- Further analysis

## Notes

- This module uses the **existing** dataset in the main repository - it does not duplicate it
- The sentiment model is a general-purpose model trained on movie reviews - it may not perfectly capture the sarcastic humor of Dilbert
- Results are meant for exploratory analysis and research purposes

