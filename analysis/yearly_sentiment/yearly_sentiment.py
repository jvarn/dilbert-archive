"""
Year-by-Year Sentiment Analysis for Dilbert Transcripts

This script:
1. Loads the Dilbert transcript dataset from the main repository
2. Computes sentiment for each comic using a pre-trained Hugging Face model
3. Aggregates sentiment by year
4. Saves results to CSV and generates a visualization

The dataset structure we expect:
- A JSON file with date strings as keys (e.g., "1989-04-16")
- Each entry has a "transcript" field containing the full text
- Dates are in "YYYY-MM-DD" format
"""

import json
from pathlib import Path
from datetime import datetime
import pandas as pd
import matplotlib.pyplot as plt
from transformers import pipeline

# ============================================================================
# CONFIGURATION
# ============================================================================

# Path to the dataset file (relative to this script's location)
# Adjust this if the dataset is moved or renamed
DATASET_PATH = Path(__file__).parent.parent.parent / "data" / "dilbert_comics_transcripts.json"

# Output files (saved in the same directory as this script)
OUTPUT_DIR = Path(__file__).parent
CSV_OUTPUT = OUTPUT_DIR / "yearly_sentiment.csv"
PNG_OUTPUT = OUTPUT_DIR / "yearly_sentiment.png"

# ============================================================================
# DATASET LOADING
# ============================================================================

def load_dataset(dataset_path: Path) -> pd.DataFrame:
    """
    Load the Dilbert transcript JSON dataset and convert it to a pandas DataFrame.
    
    We assume the JSON structure is:
    {
        "1989-04-16": {
            "transcript": "FULL TEXT HERE",
            "title": "...",
            ...
        },
        ...
    }
    
    Args:
        dataset_path: Path to the JSON file
        
    Returns:
        DataFrame with columns: date, year, text
    """
    print(f"Loading dataset from: {dataset_path}")
    
    if not dataset_path.exists():
        raise FileNotFoundError(
            f"Dataset not found at {dataset_path}. "
            f"Please check the DATASET_PATH constant in this script."
        )
    
    # Load the JSON file
    with open(dataset_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"Loaded {len(data)} comics from dataset")
    
    # Convert to list of records
    records = []
    skipped = 0
    
    for date_str, entry in data.items():
        # Extract the transcript text
        transcript = entry.get('transcript', '')
        
        # Skip entries without transcript text
        if not transcript or not transcript.strip():
            skipped += 1
            continue
        
        # Parse the date to extract year
        try:
            date_obj = datetime.strptime(date_str, "%Y-%m-%d")
            year = date_obj.year
        except ValueError:
            print(f"Warning: Could not parse date '{date_str}', skipping")
            skipped += 1
            continue
        
        records.append({
            'date': date_str,
            'year': year,
            'text': transcript.strip()
        })
    
    if skipped > 0:
        print(f"Warning: Skipped {skipped} entries due to missing data")
    
    # Create DataFrame
    df = pd.DataFrame(records)
    
    print(f"Created DataFrame with {len(df)} comics")
    print(f"Year range: {df['year'].min()} to {df['year'].max()}")
    
    return df


# ============================================================================
# SENTIMENT ANALYSIS
# ============================================================================

def compute_sentiment(df: pd.DataFrame) -> pd.DataFrame:
    """
    Compute sentiment for each comic using a pre-trained Hugging Face model.
    
    This function:
    - Uses the distilbert-base-uncased-finetuned-sst-2-english model
    - Applies sentiment analysis to each transcript
    - Converts labels to numeric scores for easier aggregation
    
    Args:
        df: DataFrame with 'text' column
        
    Returns:
        DataFrame with added columns: sentiment_label, sentiment_score, sentiment_value
    """
    print("\nInitializing sentiment analyzer...")
    print("(This may take a moment on first run as the model downloads)")
    
    # Initialize the sentiment analysis pipeline
    # This model is pre-trained and ready to use - no training needed!
    sentiment_analyzer = pipeline(
        "sentiment-analysis",
        model="distilbert-base-uncased-finetuned-sst-2-english"
    )
    
    print("Sentiment analyzer ready. Processing comics...")
    print("(This may take several minutes for thousands of comics)")
    
    # Apply sentiment analysis to each row
    # We'll do this row-by-row to show progress
    results = []
    total = len(df)
    
    for idx, row in df.iterrows():
        text = row['text']
        
        # Run sentiment analysis
        # The pipeline returns a list with one dict: [{'label': 'POSITIVE/NEGATIVE', 'score': 0.0-1.0}]
        result = sentiment_analyzer(text)[0]
        
        label = result['label']  # 'POSITIVE' or 'NEGATIVE'
        score = result['score']  # Confidence score (0.0 to 1.0)
        
        # Convert to numeric value for easier aggregation
        # POSITIVE -> positive score, NEGATIVE -> negative score
        # This gives us a range from -1.0 (very negative) to +1.0 (very positive)
        if label == "POSITIVE":
            sentiment_value = score
        else:  # NEGATIVE
            sentiment_value = -score
        
        results.append({
            'sentiment_label': label,
            'sentiment_score': score,
            'sentiment_value': sentiment_value
        })
        
        # Show progress every 100 comics
        if (idx + 1) % 100 == 0:
            print(f"  Processed {idx + 1}/{total} comics...")
    
    print(f"Completed sentiment analysis for {total} comics")
    
    # Add sentiment columns to the DataFrame
    sentiment_df = pd.DataFrame(results)
    df = pd.concat([df, sentiment_df], axis=1)
    
    return df


# ============================================================================
# AGGREGATION BY YEAR
# ============================================================================

def aggregate_by_year(df: pd.DataFrame) -> pd.DataFrame:
    """
    Aggregate sentiment scores by year.
    
    For each year, compute:
    - Mean sentiment value (average sentiment)
    - Count of comics (sample size)
    
    Args:
        df: DataFrame with 'year' and 'sentiment_value' columns
        
    Returns:
        DataFrame with columns: year, mean_sentiment, comic_count
    """
    print("\nAggregating sentiment by year...")
    
    # Group by year and compute statistics
    yearly_stats = df.groupby('year').agg({
        'sentiment_value': 'mean',  # Average sentiment
        'date': 'count'  # Count of comics
    }).rename(columns={
        'sentiment_value': 'mean_sentiment',
        'date': 'comic_count'
    }).reset_index()
    
    # Sort by year
    yearly_stats = yearly_stats.sort_values('year')
    
    print(f"Aggregated data for {len(yearly_stats)} years")
    print(f"Total comics analyzed: {yearly_stats['comic_count'].sum()}")
    
    return yearly_stats


# ============================================================================
# VISUALIZATION
# ============================================================================

def plot_sentiment_trend(yearly_stats: pd.DataFrame, output_path: Path):
    """
    Create a line chart showing sentiment trends over time.
    
    Args:
        yearly_stats: DataFrame with 'year' and 'mean_sentiment' columns
        output_path: Where to save the PNG file
    """
    print(f"\nGenerating visualization...")
    
    # Create the plot
    fig, ax = plt.subplots(figsize=(12, 6))
    
    # Plot the line
    ax.plot(
        yearly_stats['year'],
        yearly_stats['mean_sentiment'],
        marker='o',
        linewidth=2,
        markersize=6,
        color='#3b82f6',
        label='Average Sentiment'
    )
    
    # Add a horizontal line at y=0 (neutral sentiment)
    ax.axhline(y=0, color='gray', linestyle='--', linewidth=1, alpha=0.5, label='Neutral')
    
    # Customize the plot
    ax.set_xlabel('Year', fontsize=12, fontweight='bold')
    ax.set_ylabel('Average Sentiment\n(positive vs negative)', fontsize=12, fontweight='bold')
    ax.set_title('Year-by-Year Sentiment Trend in Dilbert Transcripts', fontsize=14, fontweight='bold', pad=20)
    ax.grid(True, alpha=0.3, linestyle='--')
    ax.legend(loc='best')
    
    # Format x-axis to show all years
    ax.set_xticks(yearly_stats['year'])
    ax.set_xticklabels(yearly_stats['year'], rotation=45, ha='right')
    
    # Add annotation showing total comics
    total_comics = yearly_stats['comic_count'].sum()
    ax.text(
        0.02, 0.98,
        f'Total comics analyzed: {total_comics:,}',
        transform=ax.transAxes,
        fontsize=10,
        verticalalignment='top',
        bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.5)
    )
    
    # Adjust layout to prevent label cutoff
    plt.tight_layout()
    
    # Save the plot
    plt.savefig(output_path, dpi=300, bbox_inches='tight')
    print(f"Saved plot to: {output_path}")
    
    # Show the plot (if running interactively)
    plt.show()


# ============================================================================
# MAIN WORKFLOW
# ============================================================================

def main():
    """
    Main function that orchestrates the entire analysis workflow.
    """
    print("=" * 70)
    print("Year-by-Year Sentiment Analysis for Dilbert Transcripts")
    print("=" * 70)
    
    try:
        # Step 1: Load the dataset
        df = load_dataset(DATASET_PATH)
        
        # Step 2: Compute sentiment for each comic
        df = compute_sentiment(df)
        
        # Step 3: Aggregate by year
        yearly_stats = aggregate_by_year(df)
        
        # Step 4: Save results to CSV
        yearly_stats.to_csv(CSV_OUTPUT, index=False)
        print(f"\nSaved yearly statistics to: {CSV_OUTPUT}")
        
        # Step 5: Create and save visualization
        plot_sentiment_trend(yearly_stats, PNG_OUTPUT)
        
        # Step 6: Print summary
        print("\n" + "=" * 70)
        print("Analysis Complete!")
        print("=" * 70)
        print(f"\nOutput files:")
        print(f"  CSV: {CSV_OUTPUT}")
        print(f"  PNG: {PNG_OUTPUT}")
        print(f"\nSummary statistics:")
        print(yearly_stats.describe())
        print(f"\nFirst few years:")
        print(yearly_stats.head(10).to_string(index=False))
        print(f"\nLast few years:")
        print(yearly_stats.tail(10).to_string(index=False))
        
    except Exception as e:
        print(f"\nError: {e}")
        raise


if __name__ == "__main__":
    main()

