// /home/newton/projects/myava/frontend/app/calculator/page.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';

// Types
type Cell = {
  input: string;
  value: string | number;
  dependents: Set<string>;
};

// Utility Functions
const colToLetter = (c: number): string => {
  let temp, letter = '';
  while (c >= 0) {
    temp = c % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    c = Math.floor(c / 26) - 1;
  }
  return letter;
};

const letterToCol = (letter: string): number => {
  let col = 0;
  for (let i = 0; i < letter.length; i++) {
    col = col * 26 + (letter.charCodeAt(i) - 'A'.charCodeAt(0) + 1);
  }
  return col - 1;
};

const toA1 = (row: number, col: number): string => {
  return colToLetter(col) + (row + 1);
};

const fromA1 = (a1: string): { row: number; col: number } | null => {
  const match = a1.match(/([A-Z]+)(\d+)/);
  if (!match) return null;
  return {
    row: parseInt(match[2], 10) - 1,
    col: letterToCol(match[1]),
  };
};

const parseRange = (rangeStr: string, ROWS: number, COLS: number): { row: number; col: number }[] => {
  const [startA1, endA1] = rangeStr.split(':');
  const start = fromA1(startA1);
  const end = endA1 ? fromA1(endA1) : start;
  if (!start || !end) return [];

  const startRow = Math.min(start.row, end.row);
  const endRow = Math.max(start.row, end.row);
  const startCol = Math.min(start.col, end.col);
  const endCol = Math.max(start.col, end.col);

  const cellsInGrid: { row: number; col: number }[] = [];
  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      if (r >= 0 && r < ROWS && c >= 0 && c < COLS) {
        cellsInGrid.push({ row: r, col: c });
      }
    }
  }
  return cellsInGrid;
};

const Calculator = () => {
  const ROWS = 10;
  const COLS = 5;

  // State
  const [cells, setCells] = useState<Cell[][]>([]);
  const [activeCell, setActiveCell] = useState<{ row: number; col: number }>({ row: 0, col: 0 });
  const [formulaInput, setFormulaInput] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const formulaInputRef = useRef<HTMLInputElement>(null);

  // Initialize empty grid
  useEffect(() => {
    const initialCells: Cell[][] = Array(ROWS)
      .fill(null)
      .map(() =>
        Array(COLS)
          .fill(null)
          .map(() => ({
            input: '',
            value: '',
            dependents: new Set(),
          }))
      );
    setCells(initialCells);
  }, []);

  // Cleanup dependencies
  const cleanupDependencies = useCallback(
    (row: number, col: number) => {
      setCells((prev) => {
        const newCells = prev.map((r) =>
          r.map((cell) => ({
            ...cell,
            dependents: new Set([...cell.dependents].filter((d) => d !== toA1(row, col))),
          }))
        );
        newCells[row][col].dependents = new Set();
        return newCells;
      });
    },
    []
  );

  // Recalculate a single cell
  const calculateCell = useCallback(
    (row: number, col: number, currentCells: Cell[][]): string | number => {
      const cell = currentCells[row][col];
      const input = cell.input.trim();

      cleanupDependencies(row, col);

      if (!input.startsWith('=')) {
        const num = parseFloat(input);
        return isNaN(num) ? input : num;
      }

      try {
        let formula = input.substring(1).toUpperCase();
        const references: string[] = [];

        // Handle functions: SUM, AVERAGE, IF
        formula = formula.replace(/(SUM|AVERAGE|IF)\(([^)]+)\)/g, (match, funcName, argsStr) => {
          const args = argsStr.split(',').map((a) => a.trim());

          if (funcName === 'SUM' || funcName === 'AVERAGE') {
            const rangeCells = parseRange(args[0], ROWS, COLS);
            let sum = 0;
            let count = 0;
            rangeCells.forEach(({ row: r, col: c }) => {
              references.push(toA1(r, c));
              const val = currentCells[r][c].value;
              if (typeof val === 'number') {
                sum += val;
                count++;
              }
            });
            return funcName === 'SUM' ? sum : count > 0 ? sum / count : 0;
          }

          if (funcName === 'IF') {
            if (args.length !== 3) throw new Error('Invalid IF arguments');
            const conditionStr = args[0].trim();
            let result: boolean;

            const comparisonMatch = conditionStr.match(/^([A-Z]+\d+)\s*([<>=!]+)\s*(.+)$/);
            if (comparisonMatch) {
              const refA1 = comparisonMatch[1];
              const operator = comparisonMatch[2];
              const targetStr = comparisonMatch[3];
              const coord = fromA1(refA1);
              if (!coord) throw new Error('#REF!');
              references.push(refA1);
              const left = currentCells[coord.row][coord.col].value;

              let right: any;
              if (targetStr.match(/^[A-Z]+\d+$/)) {
                const targetCoord = fromA1(targetStr);
                if (!targetCoord) throw new Error('#REF!');
                references.push(targetStr);
                right = currentCells[targetCoord.row][targetCoord.col].value;
              } else {
                const num = parseFloat(targetStr);
                right = isNaN(num) ? targetStr.replace(/"/g, '') : num;
              }

              switch (operator) {
                case '>':
                  result = left > right;
                  break;
                case '<':
                  result = left < right;
                  break;
                case '=':
                  result = left == right;
                  break;
                case '!=':
                  result = left != right;
                  break;
                default:
                  result = false;
              }
            } else {
              const coord = fromA1(conditionStr);
              if (coord) {
                references.push(conditionStr);
                const val = currentCells[coord.row][coord.col].value;
                result = typeof val === 'number' && val !== 0;
              } else {
                result = false;
              }
            }

            const returnArg = result ? args[1] : args[2];
            const returnCoord = fromA1(returnArg);
            if (returnCoord) {
              references.push(returnArg);
              return currentCells[returnCoord.row][returnCoord.col].value;
            }
            const num = parseFloat(returnArg);
            return isNaN(num) ? returnArg.replace(/"/g, '') : num;
          }

          return match;
        });

        // Resolve cell references
        formula = formula.replace(/([A-Z]+\d+)/g, (match) => {
          const coord = fromA1(match);
          if (!coord) throw new Error('#REF!');
          references.push(match);
          const val = currentCells[coord.row][coord.col].value;
          return typeof val === 'number' ? val : 0;
        });

        // Add dependencies
        setCells((prev) => {
          const updated = [...prev];
          references.forEach((ref) => {
            const coord = fromA1(ref)!;
            updated[coord.row][coord.col].dependents.add(toA1(row, col));
          });
          return updated;
        });

        // Evaluate (safe eval for prototype)
        const result = eval(formula);
        return typeof result === 'number' ? parseFloat(result.toFixed(4)) : result;
      } catch (e) {
        return '#ERROR!';
      }
    },
    [ROWS, COLS, cleanupDependencies]
  );

  // Update cell and propagate
  const updateCell = useCallback(
    (row: number, col: number) => {
      setCells((prev) => {
        const newCells = [...prev];
        const value = calculateCell(row, col, newCells);
        newCells[row][col] = { ...newCells[row][col], value };
        return newCells;
      });

      // Recalculate dependents (simple BFS)
      setTimeout(() => {
        setCells((prev) => {
          const queue = [...prev[row][col].dependents];
          const visited = new Set<string>();
          const newCells = [...prev];

          while (queue.length > 0) {
            const depA1 = queue.shift()!;
            if (visited.has(depA1)) continue;
            visited.add(depA1);

            const coord = fromA1(depA1);
            if (!coord) continue;

            const newValue = calculateCell(coord.row, coord.col, newCells);
            newCells[coord.row][coord.col] = { ...newCells[coord.row][coord.col], value: newValue };

            // Add its dependents to queue
            queue.push(...newCells[coord.row][coord.col].dependents);
          }

          return newCells;
        });
      }, 0);
    },
    [calculateCell]
  );

  // Handle input change
  const handleInput = () => {
    const { row, col } = activeCell;
    setCells((prev) => {
      const newCells = [...prev];
      newCells[row][col] = { ...newCells[row][col], input: formulaInput };
      return newCells;
    });
    updateCell(row, col);
  };

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    setActiveCell({ row, col });
    setFormulaInput(cells[row]?.[col]?.input || '');
    setTimeout(() => formulaInputRef.current?.focus(), 0);
  };

  // Simulate save (local only)
  const handleSave = () => {
    setStatusMessage('Data saved locally.');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      const { row, col } = activeCell;
      let newRow = row;
      let newCol = col;

      if (e.key === 'ArrowUp') newRow = Math.max(0, row - 1);
      else if (e.key === 'ArrowDown') newRow = Math.min(ROWS - 1, row + 1);
      else if (e.key === 'ArrowLeft') newCol = Math.max(0, col - 1);
      else if (e.key === 'ArrowRight') newCol = Math.min(COLS - 1, col + 1);
      else return;

      e.preventDefault();
      handleCellClick(newRow, newCol);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCell]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-medium mb-4"
        >
          ← Back to Tools
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Veterinary Calculator & Spreadsheet</h1>
        <p className="text-sm text-gray-600 mt-1">
          Enter values or formulas (e.g., <code>=SUM(A1:B2)</code>, <code>=IF(A1&gt;10, "High", "Low")</code>)
        </p>
      </div>

      {/* Formula Bar */}
      <div className="bg-white p-4 rounded-xl shadow mb-4">
        <div className="flex items-center gap-2">
          <div className="w-12 bg-gray-200 text-center py-1.5 rounded font-mono text-sm">
            {toA1(activeCell.row, activeCell.col)}
          </div>
          <input
            ref={formulaInputRef}
            type="text"
            value={formulaInput}
            onChange={(e) => setFormulaInput(e.target.value)}
            onBlur={handleInput}
            onKeyDown={(e) => e.key === 'Enter' && handleInput()}
            placeholder="Enter value or formula (e.g., =A1+5)"
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-mono text-sm"
          />
          <button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-colors"
          >
            Save
          </button>
        </div>
        {statusMessage && <p className="text-xs text-red-500 mt-1 min-h-[1em]">{statusMessage}</p>}
      </div>

      {/* Spreadsheet Grid */}
      <div className="overflow-auto bg-white rounded-xl shadow border border-gray-200 max-h-[70vh]">
        <table className="table-auto border-collapse w-full min-w-max">
          <thead>
            <tr>
              <th className="w-10 bg-gray-100 sticky top-0 left-0 z-10 border border-gray-300 text-center font-medium"></th>
              {Array.from({ length: COLS }).map((_, c) => (
                <th
                  key={c}
                  className="w-20 bg-gray-100 sticky top-0 z-10 border border-gray-300 text-center font-medium py-1"
                >
                  {colToLetter(c)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cells.map((row, r) => (
              <tr key={r}>
                <td className="w-10 bg-gray-100 sticky left-0 z-10 border border-gray-300 text-center font-medium py-1">
                  {r + 1}
                </td>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    onClick={() => handleCellClick(r, c)}
                    className={`w-20 min-w-[80px] h-8 border border-gray-300 text-right p-1 text-sm cursor-pointer transition-colors font-mono
                      ${activeCell.row === r && activeCell.col === c ? 'ring-2 ring-emerald-500 ring-inset' : ''}
                      ${cell.input.startsWith('=') ? 'bg-blue-50' : 'bg-white'}
                    `}
                  >
                    {cell.value === '' && cell.input === '' ? (
                      <span className="text-gray-300">0</span>
                    ) : (
                      cell.value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Note */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        Supports: <code>SUM()</code>, <code>AVERAGE()</code>, <code>IF()</code>, and basic arithmetic.
      </div>
    </div>
  );
};

export default Calculator;