import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.animation import FuncAnimation, PillowWriter
import numpy as np

# Setup the figure and axis with higher DPI for quality
fig, ax = plt.subplots(figsize=(14, 7), dpi=150)
fig.patch.set_facecolor('#f0f4f8')
ax.set_xlim(0, 1400)
ax.set_ylim(0, 700)
ax.axis('off')

# --- Design Constants ---
excel_x, excel_y, excel_w, excel_h = 20, 20, 700, 620
chat_x, chat_y, chat_w, chat_h = 750, 20, 630, 620
header_h = 50
input_h = 60

# --- Helper Functions ---

def draw_rounded_rect(ax, x, y, w, h, r, color, ec=None, lw=1, zorder=1):
    box = patches.FancyBboxPatch((x, y), w, h, boxstyle=f"round,pad=0,rounding_size={r}",
                                 facecolor=color, edgecolor=ec if ec else "none", linewidth=lw, zorder=zorder)
    ax.add_patch(box)
    return box

def draw_ui_layout():
    # Just light background, no container box
    excel_bg = patches.Rectangle((excel_x, excel_y), excel_w, excel_h, facecolor='#f9f9f9', edgecolor='none', zorder=0)
    ax.add_patch(excel_bg)

    # Blue background overlay for year headers (extends under chat window to create overlay effect)
    # Positioned to appear underneath the chat window
    blue_bg = patches.Rectangle((start_x, start_y), 900, cell_h, facecolor='#1e5a96', edgecolor='none', zorder=1)
    ax.add_patch(blue_bg)

    # Add title text to blue background
    ax.text(start_x + 10, start_y + cell_h/2, 'Apple Computer DCF', fontsize=10, color='white',
            ha='left', va='center', fontweight='bold', zorder=4, fontfamily='Menlo')

    # Chat Panel (high zorder to appear in front of Excel grid and cell highlights)
    draw_rounded_rect(ax, chat_x, chat_y, chat_w, chat_h, 15, 'white', '#dbe2e8', lw=2, zorder=10)
    # Chat Header
    draw_rounded_rect(ax, chat_x, chat_y + chat_h - header_h, chat_w, header_h, 15, '#f8f9fa', '#dbe2e8', zorder=10)
    rect_chat = patches.Rectangle((chat_x, chat_y + chat_h - header_h), chat_w, header_h/2, facecolor='#f8f9fa', zorder=50)
    ax.add_patch(rect_chat)
    ax.text(chat_x + 20, chat_y + chat_h - 32, "HyperPerfect", fontsize=14, fontweight='bold', color='#212529', zorder=51)
    ax.text(chat_x + chat_w - 20, chat_y + chat_h - 32, "AI Chat", fontsize=10, color='#6c757d', zorder=51, ha='right')

    # Input Box Area
    draw_rounded_rect(ax, chat_x + 15, chat_y + 15, chat_w - 30, input_h, 20, '#ffffff', '#ced4da', lw=1.5, zorder=10)

    # Send Button
    circle = patches.Circle((chat_x + chat_w - 45, chat_y + 45), 18, color='#0d6efd', zorder=52)
    ax.add_patch(circle)
    triangle = patches.Polygon([[chat_x + chat_w - 49, chat_y + 52], [chat_x + chat_w - 49, chat_y + 38], [chat_x + chat_w - 37, chat_y + 45]], color='white', zorder=53)
    ax.add_patch(triangle)

def draw_user_message(text, y_pos):
    """Draw a user message (right-aligned, gray background)"""
    bubble_w = 420
    bubble_h = 60
    bubble_x = chat_x + chat_w - bubble_w - 20

    # Higher zorder for user bubble to appear in GIF
    # Use a more distinct gray (#e5e5e5) so it doesn't get quantized to white in the GIF's 256-color palette
    bubble = patches.FancyBboxPatch((bubble_x, y_pos), bubble_w, bubble_h,
                                     boxstyle="round,pad=0,rounding_size=15",
                                     facecolor='#e5e5e5', edgecolor='#d0d0d0', linewidth=1, zorder=60)
    ax.add_patch(bubble)
    # User label
    ax.text(bubble_x + 15, y_pos + bubble_h - 18, "User", fontsize=8, color='#212529', zorder=61, fontweight='bold')
    ax.text(bubble_x + 15, y_pos + bubble_h - 32, text, fontsize=13, color='#212529', zorder=61, va='top', fontweight='500')

def wrap_text(text, max_chars=38):
    """Manually wrap text at word boundaries"""
    words = text.split()
    lines = []
    current_line = ""
    for word in words:
        if len(current_line) + len(word) + 1 <= max_chars:
            current_line = current_line + " " + word if current_line else word
        else:
            if current_line:
                lines.append(current_line)
            current_line = word
    if current_line:
        lines.append(current_line)
    return "\n".join(lines)

def draw_bot_message(text, y_pos, final_height=None):
    """Draw a bot message (left-aligned, white background, no outline)"""
    bubble_w = 380
    if final_height is not None:
        bubble_h = final_height
    else:
        bubble_h = max(60, len(text) // 35 * 20 + 40)
    bubble_x = chat_x + 20

    # Higher zorder for bot bubble
    bubble = patches.FancyBboxPatch((bubble_x, y_pos), bubble_w, bubble_h,
                                     boxstyle="round,pad=0,rounding_size=15",
                                     facecolor='#ffffff', edgecolor='none', linewidth=0, zorder=60)
    ax.add_patch(bubble)

    # HyperPerfect label
    ax.text(bubble_x + 10, y_pos + bubble_h - 18, "HyperPerfect", fontsize=8, color='#0d6efd', zorder=61, fontweight='bold')
    # Text with manual wrapping to prevent bleeding outside bubble
    wrapped_text = wrap_text(text)
    ax.text(bubble_x + 15, y_pos + bubble_h - 32, wrapped_text, fontsize=13, color='#212529', zorder=61, va='top', fontweight='500')

def draw_thinking_indicator(y_pos):
    """Draw thinking indicator"""
    bubble_w = 150
    bubble_h = 50
    bubble_x = chat_x + 20

    draw_rounded_rect(ax, bubble_x, y_pos, bubble_w, bubble_h, 15, '#ffffff')
    ax.text(bubble_x + 10, y_pos + 32, "HyperPerfect", fontsize=8, color='#0d6efd', zorder=3, fontweight='bold')
    ax.text(bubble_x + 15, y_pos + 18, "Thinking...", fontsize=9, color='#666666', zorder=3, va='top', style='italic')

def draw_input_placeholder(text, show_cursor=True):
    """Draw input text in the input box"""
    cursor = "|" if show_cursor else ""
    # zorder must be higher than input box background (zorder=10)
    ax.text(chat_x + 30, chat_y + 40, text + cursor, fontsize=11, color='#212529', zorder=15, fontweight='normal')

def draw_excel_cell(x, y, w, h, text, color='white', text_color='#212529', fontweight='normal', fontsize=10, highlight=False, is_formula=False, align='center'):
    """Draw an Excel cell"""
    border_color = '#2d6a4f' if highlight else 'none'
    border_width = 2.5 if highlight else 0

    cell_rect = patches.Rectangle((x, y), w, h, facecolor='none', edgecolor=border_color, linewidth=border_width, zorder=2)
    ax.add_patch(cell_rect)

    if text:
        if align == 'left':
            text_x = x + 5
        elif align == 'right':
            text_x = x + w - 5
        else:  # center
            text_x = x + w/2

        if is_formula:
            ax.text(text_x, y + h/2, str(text), fontsize=fontsize - 1, color='#d9534f',
                    ha=align, va='center', fontweight=fontweight, zorder=3, fontfamily='Menlo')
        else:
            ax.text(text_x, y + h/2, str(text), fontsize=fontsize, color=text_color,
                    ha=align, va='center', fontweight=fontweight, zorder=3, fontfamily='Menlo')

# Cell reference colors for formula highlighting
CELL_REF_COLORS = {
    'C4': '#0d6efd',    # Blue - Discount Rate
    'G9': '#dc3545',    # Red - FCF 2028E
    'C12': '#6f42c1',   # Purple - Terminal Multiple
    'C9:G9': '#198754', # Green - FCF range
}

# Cell positions in our grid (column index, row index from top)
# Row 1 = title, Row 2 = Major Assumptions header, Row 3 = Terminal Growth, Row 4 = Discount Rate
# Row 7 = PROJECTIONS header, Row 8 = Revenue, Row 9 = FCF
# Row 12 = Terminal Multiple, Row 13 = Enterprise Value
CELL_POSITIONS = {
    'C4': (2, 3),   # Column C (index 2), Row 4 (Discount Rate - 8%)
    'G9': (6, 8),   # Column G (index 6), Row 9 (FCF 2028E - 154B)
    'C12': (2, 11), # Column C (index 2), Row 12 (Terminal Multiple - 10x)
    'C9': (2, 8),   # Start of FCF range
    'G9_range': (6, 8),  # End of FCF range
}

def draw_colored_formula(ax, x, y, formula_text, fontsize=9):
    """Draw formula character by character with colored cell references"""
    # Formula: =PV(C4, 5, 0, -G9 x C12) + NPV(C4, C9:G9)
    # Total length: 41 characters
    full_formula = "=PV(C4, 5, 0, -G9 x C12) + NPV(C4, C9:G9)"

    # Define character ranges for each colored reference (start, end exclusive, color)
    # Verified positions from formula analysis
    color_ranges = [
        (4, 6, CELL_REF_COLORS['C4']),      # First C4 at positions 4-5
        (15, 17, CELL_REF_COLORS['G9']),    # G9 at positions 15-16
        (20, 23, CELL_REF_COLORS['C12']),   # C12 at positions 20-22
        (31, 33, CELL_REF_COLORS['C4']),    # Second C4 at positions 31-32
        (35, 40, CELL_REF_COLORS['C9:G9']), # C9:G9 at positions 35-39
    ]

    char_width = 8.0  # Character width for monospace font (Menlo at fontsize 9)

    for i, char in enumerate(formula_text):
        if i >= len(full_formula):
            break

        # Determine color for this character
        char_color = '#212529'  # Default black

        for start, end, color in color_ranges:
            if start <= i < end:
                # Only color if the entire reference is visible
                if len(formula_text) >= end:
                    char_color = color
                break

        char_x = x + i * char_width
        ax.text(char_x, y, char, fontsize=fontsize, color=char_color,
                ha='left', va='center', zorder=4, fontfamily='Menlo', fontweight='bold')

def draw_cell_reference_highlights(ax, formula_text, start_x, start_y, cell_w, cell_h):
    """Draw colored outlines on referenced cells only when reference is fully typed"""
    # Check which complete references are in the formula text
    refs_to_highlight = []

    # Formula: =PV(C4, 5, 0, -G9 x C12) + NPV(C4, C9:G9)
    # Total length: 41 characters
    # Verified positions:
    # - First C4 at positions 4-5 (need length >= 6)
    # - G9 at positions 15-16 (need length >= 17)
    # - C12 at positions 20-22 (need length >= 23)
    # - Second C4 at positions 31-32 (need length >= 33)
    # - C9:G9 at positions 35-39 (need length >= 40)

    # First C4 at positions 4-5 (need length >= 6)
    if len(formula_text) >= 6:
        refs_to_highlight.append(('C4', CELL_REF_COLORS['C4']))

    # G9 at positions 15-16 (need length >= 17)
    if len(formula_text) >= 17:
        refs_to_highlight.append(('G9', CELL_REF_COLORS['G9']))

    # C12 at positions 20-22 (need length >= 23)
    if len(formula_text) >= 23:
        refs_to_highlight.append(('C12', CELL_REF_COLORS['C12']))

    # C9:G9 at positions 35-39 (need length >= 40 for complete reference)
    if len(formula_text) >= 40:
        refs_to_highlight.append(('C9:G9', CELL_REF_COLORS['C9:G9']))

    for ref, color in refs_to_highlight:
        if ref == 'C9:G9':
            # Highlight range C9 to G9 as ONE continuous outline (columns 2-6, row 8)
            range_x = start_x + 2 * cell_w  # Start at column C
            range_y = start_y - 8 * (cell_h + 1)  # Row 9 (0-indexed row 8)
            range_width = 5 * cell_w  # 5 columns (C, D, E, F, G)
            highlight_rect = patches.Rectangle(
                (range_x, range_y), range_width, cell_h,
                facecolor='none', edgecolor=color, linewidth=2.5, zorder=5
            )
            ax.add_patch(highlight_rect)
        elif ref in CELL_POSITIONS:
            col, row = CELL_POSITIONS[ref]
            cell_x = start_x + col * cell_w
            cell_y = start_y - row * (cell_h + 1)
            highlight_rect = patches.Rectangle(
                (cell_x, cell_y), cell_w, cell_h,
                facecolor='none', edgecolor=color, linewidth=2.5, zorder=5
            )
            ax.add_patch(highlight_rect)

def draw_excel_header_cell(x, y, w, h, text, bg_color='none', text_color='#212529'):
    """Draw header cell (text only, no background)"""
    # Use zorder=0 for background so it appears behind chat window overlay
    header_rect = patches.Rectangle((x, y), w, h, facecolor=bg_color, edgecolor='none', linewidth=0, zorder=0)
    ax.add_patch(header_rect)
    ax.text(x + w/2, y + h/2, text, fontsize=9, color=text_color,
            ha='center', va='center', fontweight='bold', zorder=3, fontfamily='Menlo')

def draw_section_header(x, y, w, h, text):
    """Draw section header cell (text only, no background)"""
    header_rect = patches.Rectangle((x, y), w, h, facecolor='none', edgecolor='none', linewidth=0, zorder=2)
    ax.add_patch(header_rect)
    ax.text(x + w/2, y + h/2, text, fontsize=8, color='#212529',
            ha='center', va='center', fontweight='bold', zorder=3, fontfamily='Menlo')

def draw_excel_grid():
    """Draw the Excel grid background with column letters and row numbers"""
    # Column letters
    col_letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
    col_width = cell_w

    # Top column header (gray background)
    header_bg = patches.Rectangle((start_x, start_y + cell_h), len(col_letters) * col_width, cell_h,
                                   facecolor='#d3d3d3', edgecolor='#999999', linewidth=1, zorder=0)
    ax.add_patch(header_bg)

    # Draw column letters
    for i, letter in enumerate(col_letters):
        col_x = start_x + i * col_width
        ax.text(col_x + col_width/2, start_y + cell_h + cell_h/2, letter, fontsize=8, color='#212529',
                ha='center', va='center', fontweight='bold', zorder=3, fontfamily='Menlo')

    # Row numbers on the left (gray background)
    for row_num in range(1, 16):
        row_y = start_y - (row_num - 1) * (cell_h + 1)

        # Row number background
        row_bg = patches.Rectangle((start_x - 40, row_y), 40, cell_h,
                                   facecolor='#d3d3d3', edgecolor='#999999', linewidth=1, zorder=0)
        ax.add_patch(row_bg)

        # Row number text
        ax.text(start_x - 20, row_y + cell_h/2, str(row_num), fontsize=7, color='#212529',
                ha='center', va='center', fontweight='bold', zorder=3, fontfamily='Menlo')

    # Draw vertical and horizontal grid lines
    for i in range(len(col_letters) + 1):
        col_x = start_x + i * col_width
        # Vertical lines
        for row_num in range(1, 16):
            row_y = start_y - (row_num - 1) * (cell_h + 1)
            ax.plot([col_x, col_x], [row_y, row_y + cell_h], color='#e0e0e0', linewidth=0.5, zorder=0)

    # Horizontal lines
    for row_num in range(1, 16):
        row_y = start_y - (row_num - 1) * (cell_h + 1)
        ax.plot([start_x, start_x + len(col_letters) * col_width], [row_y, row_y], color='#e0e0e0', linewidth=0.5, zorder=0)

# --- Animation Frame Generation ---

frames = []

# Cell dimensions (wider to span entire Excel window)
cell_w = 100
cell_h = 38
start_x = excel_x + 50  # Start after row numbers column
start_y = excel_y + excel_h - header_h - 25  # Top data row

# Years
years = ['2024E', '2025E', '2026E', '2027E', '2028E']

# Data
projection_data = {
    'Revenue': [394, 412, 430, 445, 459],
    'FCF': [126, 135, 142, 148, 154],
}

# --- PHASE 1: User Input (0-30 frames) ---
input_text = "Build a DCF for Apple Computer."
for i in range(len(input_text) + 1):
    frames.append({
        'phase': 'input_typing',
        'input_text': input_text[:i],
        'show_cursor': i < len(input_text),
        'chat_messages': [],
        'excel_content': [],
    })

# Brief pause
for i in range(3):
    frames.append({
        'phase': 'input_pause',
        'input_text': input_text,
        'show_cursor': False,
        'chat_messages': [],
        'excel_content': [],
    })

# --- PHASE 2: User Message Sent, First Bot Response (33-100) ---
for i in range(5):
    frames.append({
        'phase': 'message_sent',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0}
        ],
        'excel_content': [],
    })

# First bot message streams
first_response = "Using the Web to find assumptions for terminal growth and discount rates."
first_response_height = max(60, len(first_response) // 35 * 20 + 40)
for i in range(1, len(first_response) + 1):
    frames.append({
        'phase': 'bot_responding',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response[:i], 'is_user': False, 'order': 1, 'final_height': first_response_height}
        ],
        'excel_content': [],
    })

# Pause after first bot response
for i in range(20):
    frames.append({
        'phase': 'bot_complete',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height}
        ],
        'excel_content': [],
    })

# --- PHASE 3: Basic Assumptions in Excel (104-150) ---
# Terminal Growth row appears
for step in range(2):
    frames.append({
        'phase': 'excel_assumptions',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 1 if step == 1 else 0}
        ],
    })

# Pause
for i in range(3):
    frames.append({
        'phase': 'excel_assumptions',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 1}
        ],
    })

# Discount Rate row appears
for step in range(2):
    frames.append({
        'phase': 'excel_assumptions',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2 if step == 1 else 1}
        ],
    })

# Pause after assumptions section complete
for i in range(25):
    frames.append({
        'phase': 'excel_assumptions',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2}
        ],
    })

# --- PHASE 4: Second Bot Response (155-195) ---
second_response = "Adding the financial projections from the PDF you uploaded."
second_response_height = 80  # Fixed height to account for wrapped text

for i in range(1, len(second_response) + 1):
    frames.append({
        'phase': 'bot_responding',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response[:i], 'is_user': False, 'order': 2, 'final_height': second_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2}
        ],
    })

# Pause after second bot response
for i in range(20):
    frames.append({
        'phase': 'bot_complete',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response, 'is_user': False, 'order': 2, 'final_height': second_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2}
        ],
    })

# --- PHASE 5: Projections in Excel (198-270) ---
# Year headers appear
for year_idx in range(len(years) + 1):
    frames.append({
        'phase': 'excel_projections',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response, 'is_user': False, 'order': 2, 'final_height': second_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2},
            {'type': 'projections', 'year_count': year_idx, 'data_rows': 0}
        ],
    })

# Revenue row appears cell by cell
for val_idx in range(len(years) + 1):
    frames.append({
        'phase': 'excel_projections',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response, 'is_user': False, 'order': 2, 'final_height': second_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2},
            {'type': 'projections', 'year_count': len(years), 'data_rows': 1, 'revenue_cells': val_idx}
        ],
    })

# FCF row appears cell by cell
for val_idx in range(len(years) + 1):
    frames.append({
        'phase': 'excel_projections',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response, 'is_user': False, 'order': 2, 'final_height': second_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2},
            {'type': 'projections', 'year_count': len(years), 'data_rows': 2, 'revenue_cells': len(years), 'fcf_cells': val_idx}
        ],
    })

# Pause after projections section complete
for i in range(25):
    frames.append({
        'phase': 'excel_complete',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response, 'is_user': False, 'order': 2, 'final_height': second_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2},
            {'type': 'projections', 'year_count': len(years), 'data_rows': 2, 'revenue_cells': len(years), 'fcf_cells': len(years)}
        ],
    })

# --- PHASE 6: Third Bot Response (280-320) ---
third_response = "Calculating enterprise value using Excel formulas."
third_response_height = 80  # Fixed height to account for wrapped text

for i in range(1, len(third_response) + 1):
    frames.append({
        'phase': 'bot_responding',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response, 'is_user': False, 'order': 2, 'final_height': second_response_height},
            {'text': third_response[:i], 'is_user': False, 'order': 3, 'final_height': third_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2},
            {'type': 'projections', 'year_count': len(years), 'data_rows': 2, 'revenue_cells': len(years), 'fcf_cells': len(years)}
        ],
    })

# Pause after third bot response
for i in range(20):
    frames.append({
        'phase': 'bot_complete',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response, 'is_user': False, 'order': 2, 'final_height': second_response_height},
            {'text': third_response, 'is_user': False, 'order': 3, 'final_height': third_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2},
            {'type': 'projections', 'year_count': len(years), 'data_rows': 2, 'revenue_cells': len(years), 'fcf_cells': len(years)}
        ],
    })

# --- PHASE 7: Terminal Value & PV Calculations (330-420) ---
# Terminal Multiple appears
for step in range(4):
    frames.append({
        'phase': 'excel_formulas',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response, 'is_user': False, 'order': 2, 'final_height': second_response_height},
            {'text': third_response, 'is_user': False, 'order': 3, 'final_height': third_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2},
            {'type': 'projections', 'year_count': len(years), 'data_rows': 2, 'revenue_cells': len(years), 'fcf_cells': len(years)},
            {'type': 'formulas', 'formula_step': step}
        ],
    })

# Pause with Terminal Value and PV of FCF values appearing
for step in range(8):
    frames.append({
        'phase': 'excel_formulas',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response, 'is_user': False, 'order': 2, 'final_height': second_response_height},
            {'text': third_response, 'is_user': False, 'order': 3, 'final_height': third_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2},
            {'type': 'projections', 'year_count': len(years), 'data_rows': 2, 'revenue_cells': len(years), 'fcf_cells': len(years)},
            {'type': 'formulas', 'formula_step': 5}
        ],
    })


# Enterprise Value formula types out slowly (4 frames per character)
enterprise_formula = "=PV(C4, 5, 0, -G9 x C12) + NPV(C4, C9:G9)"
for i in range((len(enterprise_formula) + 1) * 4):
    frames.append({
        'phase': 'excel_formulas',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response, 'is_user': False, 'order': 2, 'final_height': second_response_height},
            {'text': third_response, 'is_user': False, 'order': 3, 'final_height': third_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2},
            {'type': 'projections', 'year_count': len(years), 'data_rows': 2, 'revenue_cells': len(years), 'fcf_cells': len(years)},
            {'type': 'formulas', 'formula_step': 6, 'enterprise_formula_progress': i // 4}
        ],
    })

# Pause on complete formula so viewer can read it (1 second at 25fps)
for i in range(25):
    frames.append({
        'phase': 'excel_formulas',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response, 'is_user': False, 'order': 2, 'final_height': second_response_height},
            {'text': third_response, 'is_user': False, 'order': 3, 'final_height': third_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2},
            {'type': 'projections', 'year_count': len(years), 'data_rows': 2, 'revenue_cells': len(years), 'fcf_cells': len(years)},
            {'type': 'formulas', 'formula_step': 6, 'enterprise_formula_progress': len(enterprise_formula)}
        ],
    })

# Pause on final formula before it converts to value (longer pause to see complete formula)
for i in range(50):
    frames.append({
        'phase': 'excel_formulas',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response, 'is_user': False, 'order': 2, 'final_height': second_response_height},
            {'text': third_response, 'is_user': False, 'order': 3, 'final_height': third_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2},
            {'type': 'projections', 'year_count': len(years), 'data_rows': 2, 'revenue_cells': len(years), 'fcf_cells': len(years)},
            {'type': 'formulas', 'formula_step': 7}
        ],
    })

# --- PHASE 8: Enterprise Value Final (445-480) ---
# Enterprise Value formula and execution (without the formulas overlay)
for step in range(2):
    frames.append({
        'phase': 'excel_final',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response, 'is_user': False, 'order': 2, 'final_height': second_response_height},
            {'text': third_response, 'is_user': False, 'order': 3, 'final_height': third_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2},
            {'type': 'projections', 'year_count': len(years), 'data_rows': 2, 'revenue_cells': len(years), 'fcf_cells': len(years)},
            {'type': 'final', 'step': step}
        ],
    })

# Hold with final result (longer pause for user to read)
for i in range(50):
    frames.append({
        'phase': 'hold',
        'input_text': '',
        'chat_messages': [
            {'text': 'Build a DCF for Apple Computer.', 'is_user': True, 'order': 0},
            {'text': first_response, 'is_user': False, 'order': 1, 'final_height': first_response_height},
            {'text': second_response, 'is_user': False, 'order': 2, 'final_height': second_response_height},
            {'text': third_response, 'is_user': False, 'order': 3, 'final_height': third_response_height}
        ],
        'excel_content': [
            {'type': 'assumptions', 'rows': 2},
            {'type': 'projections', 'year_count': len(years), 'data_rows': 2, 'revenue_cells': len(years), 'fcf_cells': len(years)},
            {'type': 'final', 'step': 2}
        ],
    })

def update(frame_data):
    ax.clear()
    ax.set_xlim(0, 1400)
    ax.set_ylim(0, 700)
    ax.axis('off')

    draw_ui_layout()

    # --- Draw Input Box ---
    if frame_data.get('input_text'):
        draw_input_placeholder(frame_data['input_text'], frame_data.get('show_cursor', False))

    # --- Draw Chat Messages (top to bottom) ---
    chat_messages = frame_data.get('chat_messages', [])
    chat_start_y = chat_y + chat_h - header_h - 80  # Start lower to add space above first message

    for msg in sorted(chat_messages, key=lambda m: m.get('order', 0)):
        if msg['is_user']:
            draw_user_message(msg['text'], chat_start_y)
            chat_start_y -= max(65, len(msg['text']) // 40 * 20 + 45) + 20  # Add 20px gap
        else:
            # Use pre-calculated final_height if available, otherwise calculate
            final_height = msg.get('final_height', max(60, len(msg['text']) // 35 * 20 + 40))
            draw_bot_message(msg['text'], chat_start_y, final_height=final_height)
            chat_start_y -= final_height + 35  # Add 35px gap between bot messages

    # --- Draw Excel Grid Background ---
    draw_excel_grid()

    # --- Draw Excel Content (cumulative) ---
    excel_content = frame_data.get('excel_content', [])
    current_excel_y = start_y

    for content in excel_content:
        content_type = content.get('type')

        if content_type == 'assumptions':
            # Draw assumptions section
            rows_shown = content.get('rows', 0)

            # Blank row at top
            draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, '', 'white', fontsize=8)
            current_excel_y -= cell_h + 1

            # Header: Major Assumptions
            draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, 'Major Assumptions', '#e8e8e8', fontsize=9, fontweight='bold', align='left')
            current_excel_y -= cell_h + 1

            # Row 1: Terminal Growth
            if rows_shown >= 1:
                draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, 'Terminal Growth', '#f5f5f5', fontsize=8, align='left')
                draw_excel_cell(start_x + cell_w * 2, current_excel_y, cell_w, cell_h, '5%', '#f5f5f5', text_color='#0d6efd', fontsize=9)
                current_excel_y -= cell_h + 1

            # Row 2: Discount Rate
            if rows_shown >= 2:
                draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, 'Discount Rate', 'white', fontsize=8, align='left')
                draw_excel_cell(start_x + cell_w * 2, current_excel_y, cell_w, cell_h, '8%', 'white', text_color='#0d6efd', fontsize=9)
                current_excel_y -= cell_h + 1

                # Blank row after Discount Rate
                draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, '', '#f5f5f5', fontsize=8)
                current_excel_y -= cell_h + 1

                # Second blank row before Projections
                draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, '', 'white', fontsize=8)
                current_excel_y -= cell_h + 1

        elif content_type == 'projections':
            # Draw projections section
            year_count = content.get('year_count', 0)
            data_rows = content.get('data_rows', 0)

            # Section header
            draw_section_header(start_x, current_excel_y, cell_w, cell_h, 'PROJECTIONS')
            for i in range(year_count):
                draw_excel_header_cell(start_x + cell_w * 2 + i * cell_w, current_excel_y, cell_w, cell_h, years[i], bg_color='#1e5a96', text_color='white')
            current_excel_y -= cell_h + 1

            # Revenue row
            if data_rows >= 1:
                draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, 'Revenue', '#f5f5f5', fontsize=8, align='left')
                revenue_cells = content.get('revenue_cells', 0)
                for i in range(min(revenue_cells, len(years))):
                    draw_excel_cell(start_x + cell_w * 2 + i * cell_w, current_excel_y, cell_w, cell_h, f"{projection_data['Revenue'][i]}B", '#f5f5f5', fontsize=8)
                current_excel_y -= cell_h + 1

            # FCF row
            if data_rows >= 2:
                draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, 'FCF', 'white', fontsize=8, align='left')
                fcf_cells = content.get('fcf_cells', 0)
                for i in range(min(fcf_cells, len(years))):
                    draw_excel_cell(start_x + cell_w * 2 + i * cell_w, current_excel_y, cell_w, cell_h, f"{projection_data['FCF'][i]}B", 'white', fontsize=8)
                current_excel_y -= cell_h + 1

        elif content_type == 'formulas':
            # Draw formula section
            formula_step = content.get('formula_step', 0)

            # Two blank rows before Terminal Multiple (rows 10-11)
            draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, '', '#f5f5f5', fontsize=8)
            current_excel_y -= cell_h + 1
            draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, '', 'white', fontsize=8)
            current_excel_y -= cell_h + 1

            # Terminal Multiple (row 12)
            draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, 'Terminal Multiple', '#f5f5f5', fontsize=8, align='left')
            if formula_step >= 1:
                draw_excel_cell(start_x + cell_w * 2, current_excel_y, cell_w, cell_h, '10x', '#f5f5f5', text_color='#0d6efd', fontsize=9)
            current_excel_y -= cell_h + 1

            # Enterprise Value (row 13) - directly after Terminal Multiple
            if formula_step >= 3:
                draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, 'Enterprise Value', '#fff3cd', fontsize=8, fontweight='bold', align='left')
                # Show formula as it types out character by character
                if formula_step == 6:
                    enterprise_formula = "=PV(C4, 5, 0, -G9 x C12) + NPV(C4, C9:G9)"
                    progress = content.get('enterprise_formula_progress', 0)
                    partial_formula = enterprise_formula[:progress]
                    # Draw white background to cover cell borders as formula expands
                    formula_bg = patches.Rectangle((start_x + cell_w * 2, current_excel_y), cell_w * 5, cell_h,
                                                   facecolor='white', edgecolor='none', zorder=2)
                    ax.add_patch(formula_bg)
                    # Draw formula with colored cell references
                    draw_colored_formula(ax, start_x + cell_w * 2 + 5, current_excel_y + cell_h/2, partial_formula, fontsize=9)
                    # Draw colored outlines on referenced cells
                    draw_cell_reference_highlights(ax, partial_formula, start_x, start_y, cell_w, cell_h)
                elif formula_step >= 7:
                    # Show calculated value (no cell highlights, black unbolded text)
                    draw_excel_cell(start_x + cell_w * 2, current_excel_y, cell_w, cell_h, '$2.1T', 'white', text_color='#212529', fontsize=10, fontweight='normal', highlight=False)

        elif content_type == 'final':
            # Draw final result (all calculations complete)
            # Two blank rows before Terminal Multiple (rows 10-11)
            draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, '', '#f5f5f5', fontsize=8)
            current_excel_y -= cell_h + 1
            draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, '', 'white', fontsize=8)
            current_excel_y -= cell_h + 1

            # Terminal Multiple (row 12)
            draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, 'Terminal Multiple', '#f5f5f5', fontsize=8, align='left')
            draw_excel_cell(start_x + cell_w * 2, current_excel_y, cell_w, cell_h, '10x', '#f5f5f5', text_color='#0d6efd', fontsize=9)
            current_excel_y -= cell_h + 1

            # Enterprise Value (row 13) - black unbolded value
            draw_excel_cell(start_x, current_excel_y, cell_w, cell_h, 'Enterprise Value', '#fff3cd', fontsize=8, fontweight='bold', align='left')
            draw_excel_cell(start_x + cell_w * 2, current_excel_y, cell_w, cell_h, '$2.1T', 'white', text_color='#212529', fontsize=10, fontweight='normal', highlight=False)

# Generate animation
ani = FuncAnimation(fig, update, frames=frames, interval=40, repeat=True)
ani.save('dcf_apple_demo.gif', writer=PillowWriter(fps=25))

# Generate final frame as PNG
update(frames[-1])
plt.savefig('dcf_apple_demo_final.png', dpi=150, bbox_inches='tight', facecolor='#f0f4f8')
plt.close()

print("✓ DCF animation generated successfully: dcf_apple_demo.gif")
print(f"✓ Total frames: {len(frames)}")
print(f"✓ Duration: ~{len(frames) / 25:.1f} seconds at 25fps")
print("✓ Final frame saved as: dcf_apple_demo_final.png")
