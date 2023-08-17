import * as React from 'react'
import type { SVGProps } from 'react'

import { cn } from '~/utils/tailwind'

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={392}
		height={372}
		fill="none"
		className={cn(props.className, 'fill-sforeground')}
	>
		<path
			fillRule="evenodd"
			d="m162.307 9.113.068-.106c1.856-2.797 4.911-2.595 7.869-2.735 3.688-.174 7.372-.545 10.864-1.819 5.676-2.07 11.381-5.075 17.617-4.34 4.754.56 7.506 3.834 7.39 8.615-.006.231-.017.462-.033.693-.014.2 2.264 1.764 2.503 1.99 1.08 1.02 2.135 2.22 2.832 3.54 3.287 6.22.264 13.647-3.142 19.089-.168.268-1.989 2.895-1.955 2.928-1.352-1.322-2.02-1.714-3.974-5.012 1.532-1.202 2.121-3.276 1.933-4.497-.253-1.631-1.167-2.993-5.055-1.885-.668-.744-1.476-2.869-2.095-4.64a11.082 11.082 0 0 1-.589-2.822c-4.461 2.326-8.375 3.493-11.057 4.116-8.137 1.895-21.236 3.134-23.917-7.441-.481-1.901-.306-4.02.741-5.674Z"
			clipRule="evenodd"
		/>
		<path d="M206.988 33.28a.85.85 0 0 1 .829.87 19.847 19.847 0 0 1-1.414 6.899c-1.515 3.804-3.818 6.506-6.471 8.534l-.108.08.001 11.802a.85.85 0 0 1-.258.61l-.065.056-8.683 6.866a.85.85 0 0 1-1.01.033l-.068-.053-8.054-6.866a.85.85 0 0 1-.295-.564l-.004-.082v-7.73a.85.85 0 0 1 1.695-.082l.004.082v7.337l7.225 6.159 7.813-6.178.001-11.817c0-.242.103-.47.281-.63l.069-.057c2.606-1.891 4.882-4.45 6.349-8.13a18.163 18.163 0 0 0 1.293-6.31.85.85 0 0 1 .87-.828Z" />
		<path d="M198.742 60.648a.847.847 0 0 1 1.022.509l.026.078 3.953 13.97a.85.85 0 0 1-1.167 1.006l-.067-.034-12.214-6.872-12.068 6.87c-.65.37-1.413-.218-1.25-.924l.02-.07 4.429-13.972a.85.85 0 0 1 1.641.434l-.021.08-3.774 11.901 10.6-6.033a.85.85 0 0 1 .757-.041l.08.04 10.838 6.096-3.391-11.99a.849.849 0 0 1 .508-1.022l.078-.026Z" />
		<path d="M181.859 58.648a.85.85 0 0 1 .758 1.522l-1.287.63a451.845 451.845 0 0 1-5.134 2.437l-16.307 7.61-.715.34-.354.496c-1.31 1.802-4.227 5.494-9.785 12.43l-10.454 13.039-1.554 1.956.353.433a204.436 204.436 0 0 0 4.856 5.724l.84.948a200.61 200.61 0 0 0 6.46 6.91l.269.273 6.722-8.422c.515-.645 1.555-.251 1.512.574l-4.191 81.293h50.695a.85.85 0 0 1 .846.769l.004.081a.85.85 0 0 1-.768.846l-.082.004h-51.589a.85.85 0 0 1-.848-.894l4.1-79.547-5.671 7.104a.848.848 0 0 1-1.266.068 202.666 202.666 0 0 1-13.991-15.624.85.85 0 0 1-.006-1.06l4.229-5.309 11.045-13.775c4.396-5.506 6.566-8.294 7.352-9.46a.854.854 0 0 1 .338-.292l4.058-1.913 13.171-6.136c3.052-1.43 5.023-2.372 6.394-3.055Zm16.341-.781a.85.85 0 0 1 1.046-.459l.077.03 24.98 11.18a.848.848 0 0 1 .367.316l.042.071 18.005 35.12a.85.85 0 0 1-.18 1.012l-.062.053-1.649 1.251-.068.057-14.103 10.716a.85.85 0 0 1-1.196-.169l-.046-.069-7.361-12.205 2.946 52.254a.85.85 0 0 1-1.696.082l-3.139-55.659c-.048-.858 1.049-1.223 1.533-.552l.043.065 8.64 14.327 13.287-10.094.065-.055 1.149-.873-17.544-34.22-24.708-11.057a.85.85 0 0 1-.458-1.046l.03-.076Z" />
		<path d="M240.245 104.965a.85.85 0 0 1 .79.537l.01.029 7.848 18.841a7.42 7.42 0 0 1-.306 6.353l-.105.188-33.577 58.609a6.945 6.945 0 0 1-8.802 2.915l-.165-.074-.584-.273a2.896 2.896 0 0 1-1.443-3.75l.053-.118 3.652-7.68h-2.505a2.635 2.635 0 0 1-2.633-2.514l-.002-.121c0-1.04.612-1.979 1.555-2.404l.115-.048 8.21-3.235 7-15.512.017-.044 13.68-30.344-6.156-10.485a.851.851 0 0 1 .234-1.118l.069-.045a.849.849 0 0 1 1.118.234l.045.069 6.378 10.864c.124.211.15.464.074.694l-.032.085-13.847 30.713-.014.038-7.159 15.865a.848.848 0 0 1-.388.407l-.076.034-8.53 3.361a.936.936 0 0 0 .261 1.804l.081.003h3.85c.6 0 1.002.6.796 1.147l-.029.068-4.23 8.894a1.196 1.196 0 0 0 .495 1.557l.08.041.585.273a5.244 5.244 0 0 0 6.692-2.01l.08-.135 33.578-58.609a5.717 5.717 0 0 0 .386-4.866l-.07-.177-7.863-18.879a.844.844 0 0 1-.062-.243l-.004-.089c0-.469.38-.85.85-.85ZM89.79 68.507a.85.85 0 0 1 .836-.466l.08.011 20.265 3.78a4.901 4.901 0 0 1 3.332 2.266l.086.145 17.626 31.122 4.909-4.908a.849.849 0 0 1 1.137-.059l.064.059a.849.849 0 0 1 .059 1.136l-.059.065-5.698 5.699a.85.85 0 0 1-1.295-.112l-.045-.071-18.176-32.093a3.21 3.21 0 0 0-2.094-1.548l-.149-.03-19.645-3.663-.913 1.826 17.956 7.699a.847.847 0 0 1 .41.372l.036.073 16.573 38.568c2.422 5.629 9.738 7.034 14.074 2.756l.13-.131 8.355-8.576a.85.85 0 0 1 1.275 1.121l-.058.065-8.355 8.576c-5.11 5.251-13.88 3.69-16.892-2.938l-.09-.203-16.44-38.256-18.472-7.919a.85.85 0 0 1-.458-1.087l.033-.074 1.603-3.205Z" />
		<path d="m217.911 181.71.081.003a.85.85 0 0 1 .775.84l-.004.082-14.592 162.618a.849.849 0 0 1-.765.77l-.081.004h-14.971a.85.85 0 0 1-.841-.736l-.007-.079-5.279-131.918-13.41 54.094-6.47 77.86a.85.85 0 0 1-.769.776l-.077.003h-15.509a.85.85 0 0 1-.845-.768l-.004-.081v-80.867l.007-.115 10.44-76.62a.849.849 0 0 1 1.69.148l-.006.081-10.432 76.562v79.96h13.876l6.411-77.147.008-.068.014-.067 14.862-59.949c.23-.926 1.553-.819 1.667.086l.007.084 5.484 137.061h13.377l14.522-161.844a.85.85 0 0 1 .76-.769l.081-.004Z" />
		<path d="M200.164 344.328a.85.85 0 0 1 .846.767l.004.083v9.724l6.01 8.606a.856.856 0 0 1 .149.4l.004.086v6.366a.849.849 0 0 1-.767.846l-.083.004h-22.373a.851.851 0 0 1-.846-.768l-.004-.082v-6.366c0-.178.056-.351.16-.495l.055-.069 7.256-8.171v-10.081a.85.85 0 0 1 .768-.846l.081-.004c.442 0 .805.337.847.767l.003.083v10.405a.841.841 0 0 1-.159.494l-.055.07-7.256 8.169v5.194h20.674v-5.249l-6.01-8.605a.852.852 0 0 1-.149-.4l-.004-.086v-9.992c0-.47.38-.85.849-.85Z" />
		<path d="M206.326 363.147a.85.85 0 0 1 .083 1.695l-.083.004h-22.374a.85.85 0 0 1-.081-1.695l.081-.004h22.374Zm-48.749-18.819a.85.85 0 0 1 .846.767l.004.083-.001 9.724 6.01 8.606a.856.856 0 0 1 .149.4l.004.086v6.366a.85.85 0 0 1-.768.846l-.081.004h-22.374a.849.849 0 0 1-.845-.768l-.004-.082v-6.366c0-.168.049-.332.142-.471l.051-.068 6.711-8.177v-10.1a.85.85 0 0 1 .768-.846l.082-.004a.85.85 0 0 1 .846.767l.003.083v10.405a.846.846 0 0 1-.142.471l-.051.067-6.712 8.178v5.211h20.675v-5.249l-6.01-8.605a.861.861 0 0 1-.148-.4l-.005-.086v-9.992c0-.47.381-.85.85-.85Z" />
		<path d="M163.739 363.147a.85.85 0 0 1 .082 1.695l-.082.004h-22.374a.85.85 0 0 1-.082-1.695l.082-.004h22.374Zm8.725-342.813a.85.85 0 1 1 1.639.445c-2.31 8.506-2.411 16.866.2 23.567 1.327 3.402 3.565 6.218 6.363 7.804 2.942 1.668 6.951 1.576 11.109.101a.849.849 0 1 1 .568 1.602c-4.578 1.623-9.073 1.727-12.515-.225-3.163-1.792-5.647-4.92-7.108-8.665-2.76-7.083-2.655-15.8-.256-24.63Z" />
		<path
			fillRule="evenodd"
			d="M365.536 233.65H213.332l3.728-37.145h148.476v37.145ZM91.221 68.703a9.294 9.294 0 0 1-9.294 9.295 9.294 9.294 0 0 1-9.294-9.295 9.294 9.294 0 1 1 18.589 0Z"
			clipRule="evenodd"
		/>
		<path d="M82.302 71.086a.85.85 0 0 1 .846.768l.004.081v76.219a.851.851 0 0 1-.768.846l-.082.004H42.328a.85.85 0 0 1-.846-.768l-.004-.082v-42.817a.85.85 0 0 1 1.695-.082l.004.082v41.967h38.275V71.935a.85.85 0 0 1 .769-.845l.081-.004Z" />
		<path
			fillRule="evenodd"
			d="m32.852 100.74 9.888-16.91 9.752 16.91h-19.64Z"
			clipRule="evenodd"
		/>
		<path d="M80.983 37.78a.85.85 0 0 1 .846.767l.004.082V51.23a.85.85 0 0 1-1.695.082l-.004-.082V38.629c0-.47.38-.85.85-.85Zm18.753 6.608a.85.85 0 0 1 1.261 1.137l-.059.065-10.233 10.232a.85.85 0 0 1-1.26-1.136l.059-.065 10.232-10.233Zm213.519-.249a.85.85 0 0 1 .845.768l.004.082V68.33a.85.85 0 0 1-.767.846l-.082.004h-72.682a.85.85 0 0 1-.082-1.696l.082-.003h71.832V45.838h-94.489a.85.85 0 0 1-.845-.767l-.004-.082a.85.85 0 0 1 .768-.846l.081-.004h95.339Z" />
		<path d="M313.255 67.48c.441 0 .804.337.846.769l.004.081v88.695a.85.85 0 0 1-.768.846l-.082.004h-69.953a.85.85 0 0 1-.082-1.695l.082-.004h69.103V68.33a.85.85 0 0 1 .768-.846l.082-.003ZM296.23 52.128a.848.848 0 0 1 1.136-.058l.065.058 7.238 7.238a.85.85 0 0 1-1.137 1.26l-.065-.059-7.237-7.237a.85.85 0 0 1 0-1.202Z" />
		<path d="M303.467 52.128a.85.85 0 0 1 1.26 1.137l-.058.065-7.238 7.237a.849.849 0 0 1-1.26-1.136l.059-.065 7.237-7.238Z" />
		<path
			fillRule="evenodd"
			d="M287.091 92.82a3.734 3.734 0 1 1-7.468 0 3.734 3.734 0 0 1 7.468 0Zm-18.832 0a3.734 3.734 0 1 1-7.467 0 3.734 3.734 0 0 1 7.467 0Zm-18.832 0a3.733 3.733 0 1 1-7.466 0 3.733 3.733 0 0 1 7.466 0Zm37.664 18.533a3.733 3.733 0 1 1-7.467 0 3.733 3.733 0 0 1 7.467 0Zm-18.832 0a3.733 3.733 0 1 1-7.466 0 3.733 3.733 0 0 1 7.466 0Zm-18.832 0a3.733 3.733 0 1 1-7.467 0 3.733 3.733 0 0 1 7.467 0Zm37.664 18.533a3.734 3.734 0 1 1-7.469 0 3.734 3.734 0 0 1 7.469 0Zm-18.832 0a3.734 3.734 0 1 1-7.468 0 3.734 3.734 0 0 1 7.468 0Z"
			clipRule="evenodd"
		/>
		<path d="M372.793 90.04c2.317 0 4.234.662 5.955 1.936 1.232.912 2.062 1.803 3.716 3.835l.515.632c3.072 3.729 4.806 4.924 8.171 4.924a.85.85 0 0 1 0 1.7c-2.317 0-4.235-.663-5.955-1.937l-.241-.182c-1.105-.854-1.931-1.756-3.475-3.653l-.515-.632c-3.072-3.729-4.806-4.925-8.171-4.925-3.365 0-5.1 1.196-8.172 4.925l-.835 1.024c-1.446 1.76-2.246 2.592-3.395 3.443-1.721 1.274-3.639 1.937-5.956 1.937-2.317 0-4.234-.663-5.954-1.937l-.242-.182c-1.104-.854-1.931-1.756-3.474-3.653l-.168-.207c-3.292-4.064-5.028-5.35-8.517-5.35-3.427 0-5.163 1.24-8.343 5.135l-.663.814c-1.446 1.76-2.246 2.592-3.395 3.443-1.72 1.275-3.638 1.937-5.955 1.937s-4.234-.663-5.955-1.937l-.241-.182c-1.104-.854-1.931-1.756-3.474-3.653l-.343-.422-.341-.415c-2.967-3.568-4.698-4.72-8.001-4.72a.85.85 0 0 1 0-1.699c2.317 0 4.234.663 5.955 1.937l.241.183c1.065.822 1.871 1.691 3.311 3.453l.33.406c3.293 4.064 5.028 5.349 8.518 5.349 3.365 0 5.099-1.195 8.171-4.923l1.003-1.228c1.341-1.621 2.123-2.422 3.227-3.24 1.72-1.274 3.638-1.937 5.955-1.937s4.234.663 5.955 1.937c1.231.912 2.061 1.803 3.715 3.835l.515.632c3.071 3.729 4.806 4.924 8.17 4.924 3.365 0 5.1-1.195 8.172-4.924l.988-1.209c1.35-1.634 2.134-2.437 3.243-3.258 1.72-1.274 3.638-1.937 5.955-1.937Zm0 19.897c2.317 0 4.234.662 5.955 1.937l.241.182c.987.762 1.751 1.563 3.002 3.076l.988 1.209c3.072 3.729 4.806 4.924 8.171 4.924a.85.85 0 0 1 0 1.699c-2.317 0-4.235-.662-5.955-1.936l-.241-.183c-1.105-.853-1.931-1.755-3.475-3.652l-.167-.207c-3.293-4.064-5.03-5.35-8.519-5.35-3.428 0-5.164 1.241-8.344 5.135l-.663.814c-1.446 1.759-2.246 2.591-3.395 3.443-1.721 1.274-3.639 1.936-5.956 1.936-2.317 0-4.234-.662-5.954-1.936l-.242-.183c-1.104-.853-1.931-1.755-3.474-3.652l-.168-.207c-3.292-4.064-5.028-5.35-8.517-5.35-3.427 0-5.163 1.241-8.343 5.135l-.663.814c-1.446 1.759-2.246 2.591-3.395 3.443-1.72 1.274-3.638 1.936-5.955 1.936s-4.234-.662-5.955-1.936l-.241-.183c-1.104-.853-1.931-1.755-3.474-3.652l-.343-.423-.341-.414c-2.967-3.568-4.698-4.72-8.001-4.72a.85.85 0 0 1 0-1.699c2.317 0 4.234.662 5.955 1.937l.241.182c1.065.823 1.871 1.692 3.311 3.453l.33.407c3.293 4.064 5.028 5.349 8.518 5.349 3.365 0 5.099-1.195 8.171-4.924l1.003-1.228c1.341-1.621 2.123-2.422 3.227-3.239 1.72-1.275 3.638-1.937 5.955-1.937s4.234.662 5.955 1.937l.241.182c1.105.853 1.931 1.756 3.474 3.653l.515.632c3.071 3.729 4.806 4.924 8.17 4.924 3.365 0 5.1-1.195 8.172-4.924l.988-1.209c1.35-1.634 2.134-2.437 3.243-3.258 1.72-1.275 3.638-1.937 5.955-1.937Zm15.582 259.574a.85.85 0 0 1 .082 1.695l-.082.004H.85a.85.85 0 0 1-.083-1.695l.083-.004h387.525Z" />
		<path
			fillRule="evenodd"
			d="M141.365 370.36h22.374v-6.363h-22.374v6.363Zm42.588 0h22.374v-6.363h-22.374v6.363ZM182.4 53.782a15.879 15.879 0 0 0 9.883-.887 11.92 11.92 0 0 1-4.222 4.944 11.91 11.91 0 0 1-5.823 1.949l.162-6.006Z"
			clipRule="evenodd"
		/>
		<path
			fillRule="evenodd"
			d="M187.564 53.263a14.892 14.892 0 0 0 4.382-1.148c.714-.308 1.433.426 1.109 1.134-.899 1.963-2.294 3.819-4.525 5.298a12.431 12.431 0 0 1-6.24 2.089.849.849 0 0 1-.901-.871l.162-6.006a.849.849 0 0 1 1.041-.804c1.534.356 3.182.496 4.972.308Zm2.787 1.26.048-.069-.257.07a16.67 16.67 0 0 1-2.4.429 16.55 16.55 0 0 1-4.307-.105l-.213-.035-.109 4.032a10.672 10.672 0 0 0 4.242-1.562l.236-.152a10.786 10.786 0 0 0 2.76-2.608Zm142.726 239.236a9.294 9.294 0 1 1-18.588 0 9.294 9.294 0 0 1 9.294-9.294 9.294 9.294 0 0 1 9.294 9.294Zm-5.932 63.035h18.203v-18.203h-18.203v18.203Zm-64.894-97.399h70.826v-12.394h-70.826v12.394Zm11.719 42.7 9.887-16.91 9.752 16.91H273.97Z"
			clipRule="evenodd"
		/>
		<path d="M344.552 238.499c.442 0 .805.337.847.768l.003.082v76.219a.849.849 0 0 1-.767.845l-.083.004h-39.974a.851.851 0 0 1-.846-.767l-.003-.082V273.6h-40.063v73.243h72.58a.85.85 0 0 1 .846.768l.004.082a.85.85 0 0 1-.768.846l-.082.004h-73.429a.85.85 0 0 1-.846-.768l-.004-.082V272.75a.85.85 0 0 1 .768-.845l.082-.004h41.761a.85.85 0 0 1 .846.768l.004.081v41.968h38.275v-75.369c0-.441.337-.804.768-.846l.081-.004Z" />
		<path
			fillRule="evenodd"
			d="M26.813 258.562h29.46a.85.85 0 0 1 .844.94l-2.433 22.767a.85.85 0 0 1-.845.759H29.247a.85.85 0 0 1-.845-.759l-2.434-22.767a.85.85 0 0 1 .845-.94Zm26.261 22.766 2.253-21.067h-27.57l2.253 21.067h23.064Z"
			clipRule="evenodd"
		/>
		<path
			fillRule="evenodd"
			d="M35.486 275.257a1.932 1.932 0 1 1-3.865 0 1.932 1.932 0 0 1 3.865 0Zm7.989 0a1.932 1.932 0 1 1-3.865-.001 1.932 1.932 0 0 1 3.865.001Zm7.989 0a1.932 1.932 0 1 1-3.864 0 1.932 1.932 0 0 1 3.864 0Z"
			clipRule="evenodd"
		/>
		<path d="M55.266 267.415a.85.85 0 0 1 .082 1.696l-.082.004H27.82a.85.85 0 0 1-.082-1.696l.082-.004h27.447Zm-13.724-41.654a.85.85 0 0 1 .846.768l.004.082v32.8a.85.85 0 0 1-1.696.082l-.003-.082v-32.8c0-.469.38-.85.85-.85Z" />
		<path d="M50.188 239.987a.85.85 0 0 1 1.26 1.138l-.059.064-9.246 9.246a.849.849 0 0 1-1.26-1.137l.059-.065 9.246-9.246Z" />
		<path
			fillRule="evenodd"
			d="M33.852 226.611a7.691 7.691 0 1 1 15.382 0 7.691 7.691 0 0 1-15.382 0Zm13.682 0a5.991 5.991 0 1 0-11.982 0 5.991 5.991 0 0 0 11.982 0Zm-1.471 13.977a4.726 4.726 0 1 1 9.45.001 4.726 4.726 0 0 1-9.45-.001Zm7.751 0a3.026 3.026 0 1 0-6.052 0 3.026 3.026 0 0 0 6.052 0Zm-32.717.518a6.045 6.045 0 1 1 12.089 0 6.045 6.045 0 0 1-12.09 0Zm10.39 0a4.346 4.346 0 1 0-8.692 0 4.346 4.346 0 0 0 8.692 0Z"
			clipRule="evenodd"
		/>
		<path d="M26.54 240.505a.849.849 0 0 1 1.138-.058l.064.058 14.401 14.401a.849.849 0 0 1-1.137 1.26l-.064-.059-14.401-14.401a.849.849 0 0 1 0-1.201Z" />
		<path
			fillRule="evenodd"
			d="M11.895 323.195h81.478c.469 0 .85.38.85.85v41.644a.85.85 0 0 1-.85.849H11.895a.85.85 0 0 1-.85-.849v-41.644c0-.47.38-.85.85-.85Zm80.627 41.643v-39.944H12.744v39.944h79.778Z"
			clipRule="evenodd"
		/>
		<path
			fillRule="evenodd"
			d="M18.998 329.662H86.27c.47 0 .85.38.85.85v28.709a.85.85 0 0 1-.85.85H18.998a.85.85 0 0 1-.85-.85v-28.709c0-.47.38-.85.85-.85Zm66.423 28.709v-27.01H19.847v27.01h65.574Z"
			clipRule="evenodd"
		/>
		<path
			fillRule="evenodd"
			d="M57.822 344.867a5.187 5.187 0 0 1-5.188 5.187 5.187 5.187 0 1 1 0-10.376 5.189 5.189 0 0 1 5.188 5.189ZM11.895 281.44h81.478c.469 0 .85.38.85.85v41.644a.85.85 0 0 1-.85.849H11.895a.85.85 0 0 1-.85-.849V282.29c0-.47.38-.85.85-.85Zm80.627 41.643v-39.944H12.744v39.944h79.778Z"
			clipRule="evenodd"
		/>
		<path
			fillRule="evenodd"
			d="M18.998 287.907H86.27c.47 0 .85.38.85.85v28.709a.85.85 0 0 1-.85.85H18.998a.85.85 0 0 1-.85-.85v-28.709c0-.47.38-.85.85-.85Zm66.423 28.709v-27.01H19.847v27.01h65.574Z"
			clipRule="evenodd"
		/>
		<path
			fillRule="evenodd"
			d="M57.822 303.111a5.189 5.189 0 1 1-10.377 0 5.189 5.189 0 0 1 10.377 0Zm-35.774 67.82h7.142v-5.242h-7.142v5.242Zm54.03 0h7.142v-5.242h-7.142v5.242Zm-7.791-123.725h15.017c.47 0 .85.38.85.849v34.234a.85.85 0 0 1-.85.85H68.287a.85.85 0 0 1-.85-.85v-34.234a.85.85 0 0 1 .85-.849Zm14.167 34.233v-32.535H69.137v32.535h13.317Z"
			clipRule="evenodd"
		/>
		<path
			fillRule="evenodd"
			d="M70.721 241.12h10.15a.85.85 0 0 1 .788.534l2.434 6.085a.85.85 0 0 1-.789 1.165H68.287a.85.85 0 0 1-.789-1.165l2.434-6.085a.85.85 0 0 1 .79-.534Zm11.328 6.085-1.754-4.386h-8.999l-1.754 4.386h12.507Z"
			clipRule="evenodd"
		/>
		<path
			fillRule="evenodd"
			d="M73.056 237.159h5.48a.85.85 0 0 1 .849.849v3.962a.85.85 0 0 1-.85.849h-5.48a.85.85 0 0 1-.849-.849v-3.962a.85.85 0 0 1 .85-.849Zm4.63 3.96v-2.262h-3.78v2.262h3.78Z"
			clipRule="evenodd"
		/>
		<path d="M77.374 257.307a.85.85 0 0 1 1.26 1.137l-.058.065-5.408 5.408a.85.85 0 0 1-1.26-1.138l.058-.064 5.408-5.408Zm0 7.654a.85.85 0 0 1 1.26 1.136l-.058.065-2.18 2.179a.849.849 0 0 1-1.26-1.136l.059-.065 2.18-2.179Z" />
	</svg>
)
export default SvgComponent
