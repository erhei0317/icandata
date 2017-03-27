package ci.page;

import java.io.IOException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.jsp.HttpJspPage;

public abstract class CiPageObject extends HttpServlet implements HttpJspPage {

	private static final long serialVersionUID = 1L;

	protected boolean isPostBack = false;
	protected HttpServletRequest request;
	protected HttpServletResponse response;
	protected HttpSession session;
	protected javax.servlet.jsp.PageContext pageContext;


	public final void init(ServletConfig config) throws ServletException {
		super.init(config);
		jspInit();
		_jspInit();
	}

	public String getServletInfo() {
		return "";
	}

	public final void destroy() {
		jspDestroy();
		_jspDestroy();
	}

	/***
	 * 页面加载
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void pageLoad() throws ServletException, IOException{
	}

	/**
	 * 页面加载结束
	 * 
	 * @param request
	 * @param response
	 * @throws ServletException
	 * @throws IOException
	 */
	public void pageUnLoad() throws ServletException, IOException {
	}

	protected final void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		isPostBack = request.getMethod().toUpperCase().equals("POST");
		this.request = request;
		this.response = response;
		this.session = request.getSession();
		this.pageContext = javax.servlet.jsp.JspFactory.getDefaultFactory().getPageContext(this, request, response, null, true, 8192, true);
		
		pageLoad();
		_jspService(request, response);
		pageUnLoad();
	}

	public void jspInit() {
	}

	protected void _jspInit() {
	}

	public void jspDestroy() {
	}

	protected void _jspDestroy() {
	}

}
