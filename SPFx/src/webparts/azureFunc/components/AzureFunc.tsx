import * as React from 'react';
import styles from './AzureFunc.module.scss';
import { IAzureFuncProps } from './IAzureFuncProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import { DefaultButton, PrimaryButton, Spinner, Stack } from 'office-ui-fabric-react';
import { useState } from 'react';
import { FuncService } from '../../services/FuncService';

export const AzureFunc = (props: IAzureFuncProps): JSX.Element => {
    const [loading, setLoding] = useState<boolean>();
    const [jsonResult, setJsonResult] = useState<string>();

    const _azureFuncTestHandler = async (): Promise<void> => {
        let resultString = "";
        try {
            setLoding(true);
            const service = new FuncService(props.context);
            const result = await service.callAzureFunc();
            resultString = JSON.stringify(result, null, 4);

        } catch (error) {
            resultString = JSON.stringify(error, null, 4);
        } finally {
            console.log(resultString);
            setLoding(false);
            setJsonResult(resultString);
        }

    };
    const _cleanHandler = (): void => {
        setJsonResult("");
    };
    return (
        <section className={`${styles.azureFunc} ${props.hasTeamsContext ? styles.teams : ''}`}>
            <div>
                <h3>Azure Functions SPFx</h3>
            </div>
            <Stack horizontal disableShrink horizontalAlign="space-evenly">
                <PrimaryButton text="Azure Funcs Test" onClick={_azureFuncTestHandler} />
                <DefaultButton text="Clean" onClick={_cleanHandler} />
            </Stack>
            <div>
                {
                    loading ?
                        <Spinner label="loading..." />
                        :
                        <pre className={styles.jsoncode}>{jsonResult}</pre>
                }
            </div>

        </section>
    );
}
// export default class AzureFunc1 extends React.Component<IAzureFuncProps, {}> {
//     public render(): React.ReactElement<IAzureFuncProps> {
//         const {
//             description,
//             isDarkTheme,
//             environmentMessage,
//             hasTeamsContext,
//             userDisplayName
//         } = this.props;

//         return (
//             <section className={`${styles.azureFunc} ${hasTeamsContext ? styles.teams : ''}`}>
//                 <div className={styles.welcome}>
//                     <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
//                     <h2>Well done, {escape(userDisplayName)}!</h2>
//                     <div>{environmentMessage}</div>
//                     <div>Web part property value: <strong>{escape(description)}</strong></div>
//                 </div>
//                 <div>
//                     <h3>Welcome to SharePoint Framework!</h3>
//                     <p>
//                         The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It&#39;s the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
//                     </p>
//                     <h4>Learn more about SPFx development:</h4>
//                     <ul className={styles.links}>
//                         <li><a href="https://aka.ms/spfx" target="_blank" rel="noreferrer">SharePoint Framework Overview</a></li>
//                         <li><a href="https://aka.ms/spfx-yeoman-graph" target="_blank" rel="noreferrer">Use Microsoft Graph in your solution</a></li>
//                         <li><a href="https://aka.ms/spfx-yeoman-teams" target="_blank" rel="noreferrer">Build for Microsoft Teams using SharePoint Framework</a></li>
//                         <li><a href="https://aka.ms/spfx-yeoman-viva" target="_blank" rel="noreferrer">Build for Microsoft Viva Connections using SharePoint Framework</a></li>
//                         <li><a href="https://aka.ms/spfx-yeoman-store" target="_blank" rel="noreferrer">Publish SharePoint Framework applications to the marketplace</a></li>
//                         <li><a href="https://aka.ms/spfx-yeoman-api" target="_blank" rel="noreferrer">SharePoint Framework API reference</a></li>
//                         <li><a href="https://aka.ms/m365pnp" target="_blank" rel="noreferrer">Microsoft 365 Developer Community</a></li>
//                     </ul>
//                 </div>
//             </section>
//         );
//     }
// }
