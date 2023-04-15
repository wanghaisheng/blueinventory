// Import
import {motion} from "framer-motion";
import {
	getMainMenuLinks,
	getNavbarMenuLinks,
	getFooterMenuLinks,
} from "../../functions/MenuLinks";
import {
	fetchOperationalInsightsPostsSlugs,
	fetchOperationalInsightsPostsContent,
} from "../../functions/OperationalInsightsPostsSlugs";
import {getThemesOptionsContent} from "../../functions/themesOptions";

// Components
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import HeroThree from "../../components/HeroThree";
import Layout from "../../components/Layout/Layout";
import TitleParagraph from "../../components/TitleParagraph";

const singlePost = ({
	seo,
	content,
	pageTitle,
	mainMenuLinks,
	navbarMenuLinks,
	footerMenuLinks,
	themesOptionsContent,
}: any) => {
	return (
		<motion.div
			exit={{
				opacity: 0,
			}}
			initial="initial"
			animate="animate"
		>
			<Layout
				seo={seo}
				pageTitle={pageTitle}
				themesOptionsContent={themesOptionsContent}
				footerMenuLinks={footerMenuLinks?.footerMenuLinks}
			>
				<HeroThree
					title={content?.heroSection?.title}
					paragraph={content?.heroSection?.paragraph}
					backgroundImage={content?.heroSection?.backgroundImage}
					backgroundVideoUrl={content?.heroSection?.backgroundVideoUrl}
					backgroundImageOrVideo={content?.heroSection?.backgroundImageOrVideo}
				/>

				<TitleParagraph
					title={content?.titleParagraph?.title}
					paragraph={content?.titleParagraph?.paragraph}
				/>

				<CTA
					title={content?.contactBanner?.title}
					paragraph={content?.contactBanner?.paragraph}
					buttonLink={content?.contactBanner?.buttonLink}
					backgroundImage={content?.contactBanner?.backgroundImage?.sourceUrl}
				/>
			</Layout>
		</motion.div>
	);
};

export default singlePost;

export async function getStaticPaths() {
	const data = await fetchOperationalInsightsPostsSlugs();

	const paths = data.map((slugUrl) => ({
		params: {
			slug: slugUrl?.slug as String,
		},
	}));

	return {paths, fallback: false};
}

export async function getStaticProps({params}: any) {
	const response: any = await fetchOperationalInsightsPostsContent(
		params?.slug
	);

	const mainMenuLinks: object = await getMainMenuLinks();
	const navbarMenuLinks: object = await getNavbarMenuLinks();
	const footerMenuLinks: object = await getFooterMenuLinks();
	const themesOptionsContent: object = await getThemesOptionsContent();

	return {
		props: {
			mainMenuLinks,
			navbarMenuLinks,
			footerMenuLinks,
			themesOptionsContent,
			seo: response?.seo,
			content: response?.content,
			pageTitle: response?.pageTitle,
		},
		revalidate: 60,
	};
}
