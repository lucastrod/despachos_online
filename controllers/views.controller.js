export class ViewsController {
  static renderDashboard(req, res) {
    res.render("index");
  }
  static renderForm(req, res) {
    res.render("form");
  }
}
