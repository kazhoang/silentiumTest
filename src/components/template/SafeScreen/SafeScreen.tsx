import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '@/theme';

import type { PropsWithChildren } from 'react';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';

type SafeScreenProps = PropsWithChildren & {
	isTopEdge?: boolean;
};

function SafeScreen({ children, isTopEdge }: SafeScreenProps) {
	const { layout, variant, navigationTheme } = useTheme();
	const safeAreaEdges: Edges | undefined = !isTopEdge
		? ['right', 'bottom', 'left']
		: undefined;
	return (
		<SafeAreaView
			edges={safeAreaEdges}
			style={[
				layout.flex_1,
				{ backgroundColor: navigationTheme.colors.background },
			]}
		>
			<StatusBar
				barStyle={variant === 'dark' ? 'light-content' : 'dark-content'}
				backgroundColor={navigationTheme.colors.background}
			/>
			{children}
		</SafeAreaView>
	);
}

export default SafeScreen;
