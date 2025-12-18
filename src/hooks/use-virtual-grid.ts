import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef } from 'react';

interface UseVirtualGridProps {
  count: number;
  itemHeight: number;
  itemWidth: number;
  gap: number;
  containerWidth: number;
}

export const useVirtualGrid = ({
  count,
  itemHeight,
  itemWidth,
  gap,
  containerWidth,
}: UseVirtualGridProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const itemsPerRow = useMemo(() => {
    return Math.max(1, Math.floor((containerWidth + gap) / (itemWidth + gap)));
  }, [containerWidth, itemWidth, gap]);

  const rowCount = useMemo(() => {
    return Math.ceil(count / itemsPerRow);
  }, [count, itemsPerRow]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight + gap,
    overscan: 3,
  });

  const getVirtualItems = () => {
    return rowVirtualizer.getVirtualItems().flatMap((virtualRow) => {
      const rowStartIndex = virtualRow.index * itemsPerRow;
      const rowItemCount = Math.min(itemsPerRow, count - rowStartIndex);

      return Array.from({ length: rowItemCount }, (_, colIndex) => {
        const itemIndex = rowStartIndex + colIndex;
        return {
          index: itemIndex,
          rowIndex: virtualRow.index,
          colIndex,
          style: {
            position: 'absolute' as const,
            left: colIndex * (itemWidth + gap),
            top: virtualRow.start,
            width: itemWidth,
            height: itemHeight,
          },
        };
      });
    });
  };

  return {
    parentRef,
    getVirtualItems,
    totalHeight: rowVirtualizer.getTotalSize(),
  };
};