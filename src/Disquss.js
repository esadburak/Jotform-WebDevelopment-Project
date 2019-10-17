

import React from 'react';
import Disqus from 'disqus-react';


class Disquss extends React.Component {

    componentDidMount() {

    }


    render() {

        const disqusShortname = 'example';
        const disqusConfig = {
            url: 'this.props.article.url/' + this.props.threadID,
            identifier: this.props.threadID,
            title: this.props.threadID,
        };
        const page = 0;
        var disqus_config = function () {
            this.page.url = 'http://localhost:3000/'; // Replace PAGE_URL with your page's canonical URL variable
            this.page.identifier = this.props.threadID; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
        }
        if (document.getElementById("nav nav-secondary") != null)
            document.getElementById("nav nav-secondary").style.display = "none";
        return (
            <div className="article">
                <div id="disqus_thread"></div>
                <script>
                    {
                        /**
                        *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
                        *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/


                        (function () { // DON'T EDIT BELOW THIS LINE
                            var d = document, s = d.createElement('script');
                            s.src = 'https://eabrk.disqus.com/embed.js';
                            s.setAttribute('data-timestamp', +new Date());
                            (d.head || d.body).appendChild(s);
                        })()}
                </script>
                <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>

                <script id="dsq-count-scr" src="//eabrk.disqus.com/count.js" async></script>

            </div>

        );
    }

}
export default Disquss;


