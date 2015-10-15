<!DOCTYPE html>
<html>
<head>
    <title>Course list</title>
    <meta charset="utf-8" />
    <link href="courses.css" type="text/css" rel="stylesheet" />
</head>
<body>
<div id="header">
    <h1>Courses at CSE</h1>
<!-- Ex. 1: File of Courses -->
    <?php
        $filename = "courses.tsv";
        $lines = file($filename);
    ?>
    <p>
        Course list has <?= count($lines) ?> total courses
        and
        size of <?= filesize($filename) ?> bytes.
    </p>
</div>
<div class="article">
    <div class="section">
        <h2>Today's Courses</h2>
<!-- Ex. 2: Today’s Courses & Ex 6: Query Parameters -->
        <?php
            if (empty($_GET['number_of_courses'])) {
                $numberOfCourses = 3;
            } else {
                $numberOfCourses = $_GET['number_of_courses'];
            }
            function getCoursesByNumber($listOfCourses, $numberOfCourses){
                $resultArray = array();
                foreach ($listOfCourses as $course) {
                    if (count($resultArray) == $numberOfCourses) {
                        break;
                    }
                    $token = explode("\t", $course);
                    $resultArray[] = $token[0]." - ".$token[1];
                }
                shuffle($resultArray);
                return $resultArray;
            }
        ?>
        <ol>
            <?php
                $todaysCourses = getCoursesByNumber($lines, $numberOfCourses);
                foreach ( $todaysCourses as $course) { ?>
                    <li><?= $course ?></li>
            <? } ?>
        </ol>
    </div>
    <div class="section">
        <h2>Searching Courses</h2>
<!-- Ex. 3: Searching Courses & Ex 6: Query Parameters -->
        <?php
             if (empty($_GET['character'])) {
                $startCharacter = 'C';
             } else {
                $startCharacter = $_GET['character'];
             }
            function getCoursesByCharacter($listOfCourses, $startCharacter){
                $resultArray = array();
                foreach ($listOfCourses as $course) {
                    if ($course[0] == $startCharacter) {
                        $token = explode("\t", $course);
                        $resultArray[] = $token[0]." - ".$token[1];
                    }
                }
                return $resultArray;
            }
        ?>
        <p>
            Courses that started by <strong>'<?= $startCharacter ?>'</strong> are followings :
        </p>
        <ol>
            <?php
                $searchedCourses = getCoursesByCharacter($lines, $startCharacter);
                foreach ($searchedCourses as $course) { ?>
                    <li><?= $course ?></li>
            <? } ?>
        </ol>
    </div>
    <div class="section">
        <h2>List of Courses</h2>
<!-- Ex. 4: List of Courses & Ex 6: Query Parameters -->
        <?php
             if (empty($_GET['orderby'])) {
               $orderby = 0;
              } else {
               $orderby = $_GET['orderby'];
             }
            function getCoursesByOrder($listOfCourses, $orderby){
                $resultArray = array();
                foreach ($listOfCourses as $course) {
                    $token = explode("\t", $course);
                    $resultArray[] = $token[0]." - ".$token[1];
                }
                if($orderby == 1) {
                    rsort($resultArray);
                } else {
                    sort($resultArray);
                }
                return $resultArray;
            }
            $orderedCourses = getCoursesByOrder($lines, $orderby);
        ?>
        <p>
            All of courses ordered by <strong><? if($orderby == 0) { ?> <?= "alphabetical order" ?> <? } else { ?> <?= "alphabetical reverse order" ?> <? } ?></strong> are followings :
        </p>
        <ol>
            <?php
                foreach ($orderedCourses as $course) { ?>
                    <li <? if(strlen(explode(" - ", $course)[0]) >= 20) { ?> <?= ' class="long"' ?> <? } ?>><?= $course ?></li>
            <? } ?>
        </ol>
    </div>
    <div class="section">
        <h2>Adding Courses</h2>
<!-- Ex. 5: Adding Courses & Ex 6: Query Parameters -->
    <?php
        if (empty($newCourse) && empty($codeOfCourse)) { ?>
            <p>Input course or code of the course doesn't exist.</p>
        <? } else { ?>
                    $newCourse = $_GET['new_course'];
                    $codeOfCourse = $_GET['code_of_course'];
                    file_put_contents($filename, "\n".$newCourse."\t".$codeOfCourse, FILE_APPEND); ?>
                    <p>Adding a course is success!</p>
        <? } ?>
    </div>
</div>
<div id="footer">
    <a href="http://validator.w3.org/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-html.png" alt="Valid HTML5" />
    </a>
    <a href="http://jigsaw.w3.org/css-validator/check/referer">
        <img src="http://selab.hanyang.ac.kr/courses/cse326/2015/problems/images/w3c-css.png" alt="Valid CSS" />
    </a>
</div>
</body>
</html>