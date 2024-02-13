import { Outlet } from "@remix-run/react";

import { MainLayout as MainLayout_ } from "~/components/layouts/main";

export default function MainLayout() {
	return (
		<MainLayout_>
			<Outlet />
		</MainLayout_>
	);
}
