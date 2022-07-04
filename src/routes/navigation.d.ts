import { StackRoutesParamList } from './stack.routes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackRoutesParamList {}
  }
}
