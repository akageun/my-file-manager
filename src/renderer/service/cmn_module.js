import Store from 'electron-store';
import electron from 'electron';

import Datastore from 'nedb';
import path from 'path';

export default ({
    settingConf() {
        const defaultUsePath = (electron.app || electron.remote.app).getPath('userData');

        return new Store({
            name: 'settingConf',
            cwd: 'mfm',
            defaults: {
                file: {
                    targetPath: defaultUsePath,
                    savePath: defaultUsePath
                }
            }
        });
    },
    fileDbConf() {
        return new Datastore({
            filename: path.join((electron.app || electron.remote.app).getPath('userData'), 'mfm', 'fileDb'),
            autoload: true,
            timestampData: true
        });
    }
});
