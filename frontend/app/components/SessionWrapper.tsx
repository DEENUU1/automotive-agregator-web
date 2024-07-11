"use client";
import {SessionProvider} from "next-auth/react"
import {NextUIProvider} from '@nextui-org/react'

import React from 'react'

const SessionWrapper = ({children}: { children: React.ReactNode }) => {
	return (
		<NextUIProvider>
			<SessionProvider>{children}</SessionProvider>
		</NextUIProvider>
	)
}

export default SessionWrapper
