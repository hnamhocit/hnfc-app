import { CheckIcon } from 'phosphor-react-native'
import { useId } from 'react'
import { Checkbox, CheckboxProps, Label, XStack } from 'tamagui'

export default function CheckboxWithLabel({
	label,
	...checkboxProps
}: CheckboxProps & { label: string }) {
	const id = useId()

	return (
		<XStack
			width={300}
			items='center'
			gap='$4'>
			<Checkbox
				id={id}
				{...checkboxProps}>
				<Checkbox.Indicator>
					<CheckIcon />
				</Checkbox.Indicator>
			</Checkbox>

			<Label
				htmlFor={id}
				nativeID={id}>
				{label}
			</Label>
		</XStack>
	)
}
