import { Outlet } from "@remix-run/react";

export default function ArticlesLayout() {
	return (
		<div className="bg-green-200">
			<Outlet />
		</div>
	);
}
