import { NextPage } from "next";
import Background from "../../components/Background";
import Grid from "../../layout/grid";
import AlignCenter from "../../components/AlignCenter";
import Sections from "../../components/content/Sections";
import Button from "../../components/Button";
import Form from "../../components/Form";
import CharacterInput from "../../components/content/CharacterInput";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { requester } from "../../lib/requster";
import { useToast } from "../../context/toast.context";
import SplitInput from "../../components/content/SplitInput";
import { FormElement } from "../../type";

const Create: NextPage = () => {
	const route = useRouter();
	const { makeToast } = useToast();

	async function handleSubmit(event: React.FormEvent<FormElement>) {
		event.preventDefault();
		let errored = false;
		const { secureKeyword1, secureKeyword2, secureKeyword3, secureKeyword4 } =
			event.currentTarget.elements;

		if (secureKeyword1.value !== "웰컴") {
			makeToast("error", {
				title: "1번째 보안키워드가 다릅니다!",
				message: "힌트 : 할아버지를 도와주면 알 수 있을지도 몰라요!",
			});
			errored = true;
		}
		if (secureKeyword2.value !== "함께") {
			makeToast("error", {
				title: "2번째 보안키워드가 다릅니다!",
				message: "힌트 : 아리를 도와주면 알 수 있을지도 몰라요!",
			});
			errored = true;
		}
		if (secureKeyword3.value !== "행복") {
			makeToast("error", {
				title: "3번째 보안키워드가 다릅니다!",
				message: "힌트 : 모모를 도와주면 알 수 있을지도 몰라요!",
			});
			errored = true;
		}
		if (secureKeyword4.value !== "기부트리") {
			makeToast("error", {
				title: "4번째 보안키워드가 다릅니다!",
				message: "힌트 : 마을 곳곳에 떨어진 쓰레기들을 주워보는건 어떨까요?",
			});
			errored = true;
		}

		if (errored) return;

		makeToast(
			"notification",
			{
				title: "잠시만요!",
				message:
					"유저님이 사용할 기부공을 만들고 있어요!\n잠시만 기다려주세요 🥺",
			},
			1500,
		);
		Cookies.set(
			"accessToken",
			(await requester.post("/api/session")).data.token,
		);
		await route.push("/create/name", "/create");
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Grid>
				<Background background={"treeGreen"} textColor={"white"}>
					<Sections
						caption={"질문 1"}
						title={"게더타운에서 확인한\n보안키워드를\n입력하세요"}
						buttons={[
							<Button
								background={"treeGrey"}
								hoverBackground={"white"}
								color={"black"}
								key={"next"}>
								다음으로
							</Button>,
						]}
					/>
				</Background>
				<Background background={"treeGreenBright"} textColor={"white"}>
					<AlignCenter
						style={{
							justifyContent: "center",
						}}>
						<CharacterInput
							characterUrl={"/keyword_character.png"}
							characterPositionY={-260}>
							<SplitInput />
						</CharacterInput>
					</AlignCenter>
				</Background>
			</Grid>
		</Form>
	);
};

export default Create;
