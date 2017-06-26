import { MycontactappPage } from './app.po';

describe('mycontactapp App', () => {
  let page: MycontactappPage;

  beforeEach(() => {
    page = new MycontactappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
