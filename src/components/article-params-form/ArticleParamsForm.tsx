import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { useState, useRef } from 'react';
import { Select } from 'src/ui/select';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import {
	defaultArticleState,
	fontSizeOptions,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onApply: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen,
		rootRef: asideRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => {
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
					}}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<div className={styles.selectFontContainer}>
						<Select
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							title='Шрифт'
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, fontFamilyOption: option }))
							}
						/>
					</div>
					<div className={styles.sizeFontContainer}>
						<RadioGroup
							name='fontSize'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							title='Размер шрифта'
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, fontSizeOption: option }))
							}
						/>
					</div>
					<div className={styles.colorFontContainer}>
						<Select
							selected={formState.fontColor}
							options={fontColors}
							title='Цвет шрифта'
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, fontColor: option }))
							}
						/>
					</div>
					<div className={styles.separator}>
						<Separator />
					</div>
					<div className={styles.colorBackgroundContainer}>
						<Select
							selected={formState.backgroundColor}
							options={backgroundColors}
							title='Цвет фона'
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, backgroundColor: option }))
							}
						/>
					</div>
					<div className={styles.contentWidthContainer}>
						<Select
							selected={formState.contentWidth}
							options={contentWidthArr}
							title='Ширина контента'
							onChange={(option) =>
								setFormState((prev) => ({ ...prev, contentWidth: option }))
							}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setFormState(defaultArticleState);
								props.onApply(defaultArticleState);
								setIsOpen(false);
							}}
						/>
						<Button
							title='Применить'
							htmlType='submit'
							type='apply'
							onClick={() => {
								props.onApply(formState);
								setIsOpen(false);
							}}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
