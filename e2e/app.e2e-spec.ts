import { ScribblrClientAppPage } from './app.po';

describe('scribblr-client-app App', () => {
  let page: ScribblrClientAppPage;

  beforeEach(() => {
    page = new ScribblrClientAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
