export default function getProps(id) {
	let props;

	switch (id) {
		case "flexDirection":
			props = getFlexDirection();
			break;
		case "flexWrap":
			props = getFlexWrap();
			break;
		default:
			break;
	}

	return props;
}

const getFlexDirection = () => {
	return [
		"flex-direction",
		{
			isDefault: true,
			value: "row",
		},
		{
			value: "row-reverse",
		},
		{
			value: "column",
		},
		{
			value: "column-reverse",
		},
	];
};

const getFlexWrap = () => {
	return [
		"flex-wrap",
		{
			isDefault: true,
			value: "nowrap",
		},
		{
			value: "wrap",
		},
		{
			value: "wrap-reverse",
		},
	];
};
