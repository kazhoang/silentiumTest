import { useTheme } from '@/theme';
import { screenWidth } from '@/types/theme/responsive';
import { formatTextHtml } from '@/utils/helpers';
import { useMemo } from 'react';
import RenderHTML from 'react-native-render-html';

const ContentHtml = ({ html }: { html: string }) => {
	const { fonts } = useTheme();
	const htmlSource = useMemo(
		() => ({
			html: formatTextHtml(html),
		}),
		[html],
	);

	if (!htmlSource) {
		return null;
	}

	return (
		<RenderHTML
			contentWidth={screenWidth}
			source={htmlSource}
			baseStyle={{ ...fonts.gray900, ...fonts.light, ...fonts.size_14 }}
			tagsStyles={{
				a: { ...fonts.purple, ...fonts.bold, ...fonts.underline },
			}}
			defaultTextProps={{ selectable: true }}
			// renderersProps={htmlRenderersProps}
			enableExperimentalBRCollapsing
			enableExperimentalGhostLinesPrevention
			enableExperimentalMarginCollapsing
		/>
	);
};

export default ContentHtml;
