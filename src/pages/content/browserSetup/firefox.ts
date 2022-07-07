import { browser } from 'webextension-polyfill-ts';
import ConfigProvider from '../../shared/configProvider';
import debug from '../../shared/debug';
import SilenceSkipper from '../../shared/lib/SilenceSkipper';
import { MediaElement } from '../../shared/types';
import inspectMediaElements from '../inspectMediaElements';

export default function setupFirefoxContent(config: ConfigProvider) {
  inspectMediaElements((element: MediaElement) => {
    debug('Main: Attaching skipper to new element', element);

    browser.runtime.sendMessage({ command: 'hasElement' });

    new SilenceSkipper(config, element);
  });
}
