import { AppStackRoutesParamList } from './app.stack.routes';
import { AppTabRoutesParamList } from './app.tab.routes';
import { AuthRoutesParamList } from './auth.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackRoutesParamList, AuthRoutesParamList, AppTabRoutesParamList {}
  }
}
