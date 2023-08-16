import * as React from 'react'

function BrandIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			width={props.width ?? '100%'}
			height={props.height ?? '100%'}
			viewBox="0 0 300 300"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M261.481 171.8v-17.926c0-59.393-48.269-107.554-107.8-107.554a107.68 107.68 0 00-84.303 40.522M46.2 136.17v17.926c0 59.459 48.245 107.584 107.8 107.584a108.562 108.562 0 0084.219-40.257"
				className="stroke-ssecondary-foreground"
				strokeWidth={7}
				strokeMiterlimit={10}
				strokeLinecap="square"
			/>
			<path
				d="M19.25 154l26.469-26.469L73.39 154m215.359 0l-26.469 26.469L234.609 154"
				className="stroke-ssecondary-foreground"
				strokeWidth={7}
				strokeMiterlimit={10}
				strokeLinecap="round"
			/>
			<path
				d="M135.667 113L154 131.333l36.667-36.666M117.333 113l18.334 18.333M154 113l18.333-18.333"
				className="stroke-ssecondary-foreground"
				strokeWidth={6}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M183.622 173.761a3 3 0 00-4.244 0l-25.302 25.307a3 3 0 01-2.122.879h-1.408a3 3 0 01-2.122-.879l-6.052-6.057a3 3 0 00-4.244 0L122.144 209a2.754 2.754 0 01-3.894-3.894l19.174-19.174a3 3 0 012.122-.879h1.408a3 3 0 012.122.879l6.052 6.057a3 3 0 004.244 0l25.302-25.307a3 3 0 012.122-.879h1.403c.795 0 1.559.316 2.121.879l8.178 8.177a2.751 2.751 0 11-3.892 3.89l-4.984-4.988z"
				className="fill-ssecondary-foreground"
			/>
		</svg>
	)
}

export default BrandIcon
