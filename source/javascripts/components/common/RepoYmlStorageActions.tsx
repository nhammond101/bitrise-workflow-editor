import React, { useState, useMemo } from "react";
import { Flex, Icon, Text, Notification, Link } from "@bitrise/bitkit";
import CopyToClipboard from "react-copy-to-clipboard";
import { AppConfig } from "../../models/AppConfig";
import appConfigAsYml from "../../utils/appConfigAsYml";

type RepoYmlStorageActionsProps = {
	appConfig: AppConfig | string;
};

const RepoYmlStorageActions: React.FC<RepoYmlStorageActionsProps> = ({ appConfig }: RepoYmlStorageActionsProps) => {
	const [actionSelected, setActionSelected] = useState<string | null>(null);
	const [clearActionTimeout, setClearActionTimeout] = useState<number | undefined>();

	const yml = useMemo(() => appConfigAsYml(appConfig), [appConfig]);

	const selectAction = (actionName: string): void => {
		setActionSelected(actionName);

		if (clearActionTimeout) {
			window.clearTimeout(clearActionTimeout);
		}

		setClearActionTimeout(window.setTimeout(() => setActionSelected(null), 5000));
	};

	return (
		<Flex direction="vertical" gap="x4">
			<Flex direction="vertical" gap="x6">
				<CopyToClipboard text={yml} onCopy={() => selectAction("clipboard")}>
					<Flex clickable direction="horizontal" gap="x2">
						<Icon textColor="grape-3" name="Chain" />
						<Text textColor="grape-3">Copy the content of the current bitrise.yml file to the clipboard</Text>
					</Flex>
				</CopyToClipboard>

				<Link
					href={`data:attachment/text,${encodeURIComponent(yml)}`}
					target="_blank"
					download="bitrise.yml"
					onClick={() => selectAction("download")}
				>
					<Flex direction="horizontal" gap="x2">
						<Icon textColor="grape-3" name="Download" />
						<Text textColor="grape-3">Download the bitrise.yml file</Text>
					</Flex>
				</Link>
			</Flex>

			{actionSelected && (
				<Notification margin="x2" type="success">
					<Text>
						{actionSelected === "clipboard"
							? "Copied the content of the current bitrise.yml file to the clipboard. "
							: "Downloading bitrise.yml. "}
						Commit the file to the app's repository before updating the setting.
					</Text>
				</Notification>
			)}
		</Flex>
	);
};

export default RepoYmlStorageActions;
