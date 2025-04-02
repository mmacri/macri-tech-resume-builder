
import { Link } from 'react-router-dom';

const Portfolio = () => {
  return (
    <>
      {/* Index of Projects*/}
      <section className="resume-section" id="index-of-projects">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">Index of Projects</h2>
          <p className="mb-4">This portfolio showcases a variety of projects that demonstrate my skills and expertise in different areas of technology. The projects include tools for sentiment analysis, financial dashboards, AI/ML policy creation, policy management systems, and customer engagement deliverables.</p>
          <p className="font-bold mb-3">Projects Overview:</p>
          <ul className="list-disc pl-6 space-y-2 mb-8">
            <li><a href="#sentiment-analyzer" className="text-macri-primary hover:underline">Sentiment Analyzer</a></li>
            <li><a href="#financial-dashboard" className="text-macri-primary hover:underline">Financial Dashboard</a></li>
            <li><a href="#ai-ml-policies" className="text-macri-primary hover:underline">AI/ML Policies</a></li>
            <li><a href="#policy-registrar" className="text-macri-primary hover:underline">Policy Registrar</a></li>
            <li><a href="#customer-engagement-deliverables" className="text-macri-primary hover:underline">Customer Engagement Deliverables</a></li>
            <li><a href="#portfolio-website" className="text-macri-primary hover:underline">Portfolio Website</a></li>
          </ul>
        </div>
      </section>
      
      <hr className="m-0" />
      
      {/* Sentiment Analyzer*/}
      <section className="resume-section" id="sentiment-analyzer">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">Sentiment Analyzer</h2>
          <div className="card p-6 mb-6">
            <p className="mb-4">This project involves developing a sentiment analysis tool that uses natural language processing (NLP) techniques to analyze and classify the sentiment of text data. The tool can be used to gauge public opinion, customer feedback, and social media sentiment.</p>
            <div className="mb-4">
              <p className="font-bold mb-2">Technologies Used:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">NLTK</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Scikit-learn</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Flask</span>
              </div>
            </div>
            <a 
              href="https://github.com/mmacri/my-portfolio/tree/master/Projects/Sentiment-Analyzer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-macri-primary hover:underline mb-4 inline-block"
            >
              View on GitHub
            </a>
            <a href="#index-of-projects" className="btn btn-primary mt-2">Back to Index of Projects</a>
          </div>
        </div>
      </section>
      
      <hr className="m-0" />
      
      {/* Financial Dashboard*/}
      <section className="resume-section" id="financial-dashboard">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">Financial Dashboard</h2>
          <div className="card p-6 mb-6">
            <p className="mb-4">This project is a financial dashboard that provides real-time insights into financial data. It includes features such as data visualization, trend analysis, and performance metrics to help users make informed financial decisions.</p>
            <div className="mb-4">
              <p className="font-bold mb-2">Technologies Used:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">JavaScript</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">D3.js</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Node.js</span>
              </div>
            </div>
            <a 
              href="https://github.com/mmacri/my-portfolio/tree/master/Projects/Financial-Dashboard" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-macri-primary hover:underline mb-4 inline-block"
            >
              View on GitHub
            </a>
            <a href="#index-of-projects" className="btn btn-primary mt-2">Back to Index of Projects</a>
          </div>
        </div>
      </section>
      
      <hr className="m-0" />
      
      {/* AI/ML Policies*/}
      <section className="resume-section" id="ai-ml-policies">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">AI/ML Policies</h2>
          <div className="card p-6 mb-6">
            <p className="mb-4">This project focuses on creating policies for the ethical and responsible use of AI and machine learning technologies. It includes guidelines for data privacy, algorithmic transparency, and bias mitigation.</p>
            <div className="mb-4">
              <p className="font-bold mb-2">Technologies Used:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Python</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">TensorFlow</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Keras</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Jupyter Notebook</span>
              </div>
            </div>
            <a 
              href="https://github.com/mmacri/my-portfolio/tree/master/Projects/AI-ML-Policies" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-macri-primary hover:underline mb-4 inline-block"
            >
              View on GitHub
            </a>
            <a href="#index-of-projects" className="btn btn-primary mt-2">Back to Index of Projects</a>
          </div>
        </div>
      </section>
      
      <hr className="m-0" />
      
      {/* Policy Registrar*/}
      <section className="resume-section" id="policy-registrar">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">Policy Registrar</h2>
          <div className="card p-6 mb-6">
            <p className="mb-4">This project involves developing a policy registrar system that helps organizations manage and track their policies and procedures. It includes features such as policy creation, approval workflows, and compliance tracking.</p>
            <div className="mb-4">
              <p className="font-bold mb-2">Technologies Used:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Java</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Spring Boot</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">MySQL</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Thymeleaf</span>
              </div>
            </div>
            <a 
              href="https://github.com/mmacri/my-portfolio/tree/master/Projects/Policy-Registrar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-macri-primary hover:underline mb-4 inline-block"
            >
              View on GitHub
            </a>
            <a href="#index-of-projects" className="btn btn-primary mt-2">Back to Index of Projects</a>
          </div>
        </div>
      </section>
      
      <hr className="m-0" />
      
      {/* Customer Engagement Deliverables*/}
      <section className="resume-section" id="customer-engagement-deliverables">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">Customer Engagement Deliverables</h2>
          <div className="card p-6 mb-6">
            <p className="mb-4">This dashboard project is an example of simple reporting to enhance customer engagement and satisfaction with transparency. This model can easily be expanded to capture more specific workstreams, outcomes and key metrics with actual project tracking to customer outcomes.</p>
            <div className="mb-4">
              <p className="font-bold mb-2">Technologies Used:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">HTML</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">CSS</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">JavaScript</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Bootstrap</span>
              </div>
            </div>
            <a 
              href="https://mmacri.github.io/customer-engagement-tracker/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-macri-primary hover:underline mb-4 inline-block"
            >
              View Example of deliverable
            </a>
            <a href="#index-of-projects" className="btn btn-primary mt-2">Back to Index of Projects</a>
          </div>
        </div>
      </section>
      
      <hr className="m-0" />
      
      {/* Portfolio Website*/}
      <section className="resume-section" id="portfolio-website">
        <div className="resume-section-content px-4 md:px-8">
          <h2 className="text-4xl font-bold mb-8">Portfolio Website</h2>
          <div className="card p-6 mb-6">
            <p className="mb-4">This website serves as a comprehensive portfolio to showcase my projects and skills. It is built using modern web technologies and provides an overview of various projects I have worked on, including tools for sentiment analysis, financial dashboards, AI/ML policy creation, policy management systems, and customer engagement deliverables.</p>
            <div className="mb-4">
              <p className="font-bold mb-2">Technologies Used:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">HTML</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">CSS</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">JavaScript</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Bootstrap</span>
              </div>
            </div>
            <a 
              href="https://github.com/mmacri/Websites" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-macri-primary hover:underline mb-4 inline-block"
            >
              View on GitHub
            </a>
            <a href="#index-of-projects" className="btn btn-primary mt-2">Back to Index of Projects</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
