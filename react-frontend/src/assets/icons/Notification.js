import * as React from 'react';
const Notification = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} fill="currentColor" {...props}>
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M7.5 14.25h3a1.5 1.5 0 0 1-3 0Zm6-3.75-.002-3.75c-.021-2.08-1.455-3.864-3.388-4.357.006-.047.015-.094.015-.143a1.125 1.125 0 0 0-2.25 0c0 .049.009.096.015.143C5.957 2.886 4.52 4.67 4.5 6.75v3.75L3 12.33v1.17h12v-1.17l-1.5-1.83Z"
			clipRule="evenodd"
		/>
	</svg>
);
export default Notification;
