<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">Trainings</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>

        <md-list>
          <md-list-item @click="alert('Create Training')">
            <md-icon>loupe</md-icon>
            <span class="md-list-item-text">Create Training</span>
          </md-list-item>

          <md-list-item @click="alert('Planned Trainings')">
            <md-icon>calendar_today</md-icon>
            <span class="md-list-item-text">Planned Trainings</span>
          </md-list-item>

          <md-list-item @click="alert('Removed Trainings')">
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Removed Trainings</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content class="md-scrollbar">
        <div class="section" data-fm-style="Heading-2"><a id="id_98210"></a><h3><a href="#id_98210" class="sectionLink">Understanding How Training and Classification Works</a></h3><p><a id="id_pgfId-1054049"></a>The <em>classifier</em> is a set of APIs that allow you to define <em>classes</em>, or categories of nodes. By running samples of classes through the classifier to train it on what constitutes a given class, you can then run that trained classifier on unknown documents or nodes to determine to which classes each belongs. The process of classification uses the full-text indexing capabilities of MarkLogic Server, as well as its XML-awareness, to perform statistical analysis of terms in the training content to determine class membership. This section describes the concepts behind the classifier and includes the following parts:</p><ul>
          <li><a href="#id_12928">Training and Classification</a></li>
          <li><a href="#id_84623">XML SVM Classifier</a></li>
          <li><a href="#id_74229">Hyper-Planes and Thresholds for Classes</a></li>
          <li><a href="#id_39167">Training Content for the Classifier</a></li>
        </ul><div class="section" data-fm-style="Heading-3"><a id="id_12928"></a><h4><a href="#id_12928" class="sectionLink">Training and Classification</a></h4><p><a id="id_pgfId-1056461"></a>There are two basic steps to using the classifier: training and classification. <em>Training</em> is the process of taking content that is known to belong to specified classes and creating a classifier on the basis of that known content. <em>Classification</em> is the process of taking a classifier built with such a training content set and running it on unknown content to determine class membership for the unknown content. Training is an iterative process whereby you build the best classifier possible, and classification is a one-time process designed to run on unknown content.</p></div><div class="section" data-fm-style="Heading-3"><a id="id_84623"></a><h4><a href="#id_84623" class="sectionLink">XML SVM Classifier</a></h4><p><a id="id_pgfId-1054381"></a>The MarkLogic Server classifier implements a support vector machine (SVM). An SVM classifier uses a well-known algorithm to determine membership in a given class, based on training data. For background on the mathematics behind support vector machine (SVM) classifiers, try doing a web search for <code>svm classifier</code>, or start by looking at the information on <a href="http://en.wikipedia.org/wiki/Support_vector_machines">Wikipedia</a>.</p><p><a id="id_pgfId-1054904"></a>The basic idea is that the classifier takes a set of training content representing known examples of classes and, by performing statistical analysis of the training content, uses the knowledge gleaned from the training content to decide to which classes other unknown content belongs. You can use the classifier to gain knowledge about your content based on the statistical analysis performed during training.</p><p><a id="id_pgfId-1054958"></a>Traditional SVM classifiers perform the statistical analysis using term frequency as input to the support vector machine calculations. The MarkLogic XML SVM classifier takes advantage of MarkLogic Server's XML-aware full-text indexing capabilities, so the terms that act as input to the classifier can include content (for example, words), structure information (for example, elements), or a combination of content and structure (for example, element-word relationships). All of the MarkLogic Server index options that affect terms are available as options in the classifier API, so you can use a wide variety of indexing techniques to tune the classifier to work the best for your sample content.</p><p><a id="id_pgfId-1054962"></a>First you define your classes on a set of training content, and then the classifier uses those classes to analyze other content and determine its classification. When the classifier analyzes the content, there are two sometimes conflicting measurements it uses to help determine if the information in the new content belongs in or out of a class:</p><ul>
          <li><a id="id_pgfId-1054441"></a><em>Precision</em>: The probability that what is classified as being in a class is actually in that class. High precision might come at the expense of missing some results whose terms resemble those of other results in other classes. </li>
          <li><a id="id_pgfId-1054442"></a><em>Recall</em>: The probability that an item actually in a class is classified as being in that class. High recall might come at the expense of including results from other classes whose terms resemble those of results in the target class.</li>
        </ul><p><a id="id_pgfId-1055115"></a>When you are tuning your classifier, you need to find a balance between high precision and high recall. That balance depends on what your application goals and requirements are. For example, if you are trying to find trends in your content, then high precision is probably more important; you want to ensure that your analysis does not include irrelevant nodes. If you need to identify every instance of some classification, however, you probably need a high recall, as missing any members would go against your application goals. For most applications, you probably need somewhere in between. The process of training your classifier is where you determine the optimal values (based on your training content set) to make the trade-offs that make sense to your application.</p></div><div class="section" data-fm-style="Heading-3"><a id="id_74229"></a><h4><a href="#id_74229" class="sectionLink">Hyper-Planes and Thresholds for Classes</a></h4><p><a id="id_pgfId-1055117"></a>There are two main things that the computations behind the XML SVM classifier do:</p><ul>
          <li><a id="id_pgfId-1054991"></a>Determine the boundaries between each class. This is done during training.</li>
          <li><a id="id_pgfId-1055000"></a>Determine the threshold for which the boundaries return the most distinctive results when determining class membership.</li>
        </ul><p><a id="id_pgfId-1056520"></a>There can be any number of classes. A <em>term vector</em> is a representation of all of the terms (as defined by the index options) in a node. Therefore, classes consist of sets of term vectors which have been deemed similar enough to belong to the same class. </p><p><a id="id_pgfId-1056538"></a>Imagine for a moment that each term forms a dimension. It is easy to visualize what a 2-dimensional picture of a class looks like (imagine an x-y graph) or even a 3-dimensional picture (imagine a room with height, width, and length). It becomes difficult, however, to visualize what the picture of these dimensions looks like when there are more than three dimensions. That is where <em>hyper-planes</em> become a useful concept.</p><p><a id="id_pgfId-1055011"></a>Before going deeper into the concept of hyper-planes, consider a content set with two classes, one that are squares and one that are triangles. In the following figures, each square or triangle represents a term vector that is a member of either the square or triangle class, respectively. </p><p><a id="id_pgfId-1056588"></a></p><p><a id="id_pgfId-1056589"></a>Now try to draw a line to separate the triangles from the squares. In this case, you can draw such a line that nicely divides the two classes as follows:</p><p><a id="id_pgfId-1055100"></a></p><p><a id="id_pgfId-1055107"></a>If this were three dimensions, instead of a line between the classes it would be a <em>plane</em> between the classes. When the number of dimensions grows beyond three, the extension of the plane is called a <em>hyper-plane</em>; it is the generalized representation of a boundary of a class (sometimes called the edge of a class). </p><p><a id="id_pgfId-1055126"></a>The previous examples are somewhat simplified; they are set up such that the hyper-planes can be drawn such that one class is completely on one side and the other is completely on the other. For most real-world content, there are members of each class on the other side of the boundaries as follows:</p><p><a id="id_pgfId-1055165"></a></p><p><a id="id_pgfId-1055135"></a>In these cases, you can draw other lines parallel to the boundaries (or in the <em>n</em>-dimensional cases, other hyper-planes). These other lines represent the <em>thresholds</em> for the classes. The distance between the boundary line and the threshold line represents the threshold value, which is a negative number indicating how far the outlier members of the class are from the class boundary. The following figure represents these thresholds.</p><p><a id="id_pgfId-1055230"></a></p><p><a id="id_pgfId-1055193"></a>The dotted lines represent some possible thresholds. The lines closer to the boundary represent thresholds with higher precision (but not complete precision), while the lines farther from the boundaries represent higher recall. For members of the triangle class that are on the other side of the square class boundaries, those members are not in the class, but if they are within the threshold you choose, then they are considered part of the class.</p><p><a id="id_pgfId-1055274"></a>One of the classifier APIs (<a href="/cts:thresholds">cts:thresholds</a>) helps you find the right thresholds for your training content set so you can get the right balance between precision and recall when you run unknown content against the classifier to determin class membership.</p><p><a id="id_pgfId-1056980"></a>The following figure shows the triangle class boundary, including the precision and recall calculations based on a threshold (the triangle class is below the threshold line):</p><p><a id="id_pgfId-1057027"></a></p></div><div class="section" data-fm-style="Heading-3"><a id="id_39167"></a><h4><a href="#id_39167" class="sectionLink">Training Content for the Classifier</a></h4><p><a id="id_pgfId-1054391"></a>To find the best thresholds for your content, you need to <em>train</em> the classifier with sample content that represents members of all of the classes. It is very important to find good training samples, as the quality of the training will directly impact the quality of your classification.</p><p>The samples for each class should be statistically relevant, and should have samples that include both solid examples of the class (that is, samples that fall well into the positive side of the threshold from the class boundary) and samples that are close to the boundary for the class. The samples close to the boundary are very important, because they help determine the best thresholds for your content. For more details about training sets and setting the threshold, see <a href="#id_25981">Creating a Training Set</a> and <a href="#id_84045">Methodology For Determining Thresholds For Each Class</a>.</p></div></div>
      </md-app-content>
    </md-app>
    <div>
      <div class="page-footer">
        <md-bottom-bar md-type="shift">
          <md-bottom-bar-item id="bottom-bar-item-home" md-label="Home" md-icon="home"></md-bottom-bar-item>
          <md-bottom-bar-item id="bottom-bar-item-pages" md-label="Pages" md-icon="pages"></md-bottom-bar-item>
          <md-bottom-bar-item id="bottom-bar-item-posts" md-label="Posts" md-icon="collections"></md-bottom-bar-item>
          <md-bottom-bar-item id="bottom-bar-item-favorites" md-label="Favorites" md-icon="favorite"></md-bottom-bar-item>
        </md-bottom-bar>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --md-theme-default-primary: #3f51b5;
}
.page-container {
  margin-top: 10px;
}
.page-footer {
  position: fixed;
  bottom: 0;
  width: 1200px;
  z-index: 10;
}
.md-content {
  max-height: 800px;
  overflow: auto;
}
</style>

<script>
export default {
  name: 'App',
  components: {},
  methods: {
    alert (message) {
      window.alert(message)
    }
  }
}
</script>
