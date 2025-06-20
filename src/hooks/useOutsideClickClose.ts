import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		if (isOpen) {
			const handleClick = (event: MouseEvent) => {
				const { target } = event;
				if (target instanceof Node && !rootRef.current?.contains(target)) {
					onClose?.();
					onChange?.(false);
				}
			};

			document.addEventListener('mousedown', handleClick);

			return () => {
				document.removeEventListener('mousedown', handleClick);
			};
		}
	}, [onClose, onChange, isOpen, rootRef]);
};
