<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>battleShip( );</title>

    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
            <div class="panel panel-default title">
                <div class="panel-body">
                    <h1>battleShip();</h1>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
            <div class="panel panel-default">
                <div class="panel-body">

                    <div class="container-fluid">

                        <!-- Coordinates -->
                        <div class="row center-offset">

                            <div class="col-xs-1 col-xs-offset-2">
                                <button class="btn btn-primary">1</button>
                            </div>

                            <?php

                            //loop through the rest of the coordinates
                            //hardcoded because formatting is way way off for anything other than 9
                            for ($i = 2; $i <= 9; $i++) { ?>

                                <div class="col-xs-1">
                                    <button class="btn btn-primary"><?php echo $i; ?></button>
                                </div>

                            <?php } ?>

                        </div>

                        <?php

                        $rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

                        //loop for each row
                        //hardcoded because formatting is way way off for anything other than 9
                        for ($j = 0; $j < 9; $j++) { ?>

                            <!-- Row <?php echo $rows[$j]; ?> -->
                            <div class="row center-offset">

                                <div class="col-xs-1 col-xs-offset-1">
                                    <button class="btn btn-primary"><?php echo $rows[$j]; ?></button>
                                </div>

                                <?php

                                //loop for each column
                                //hardcoded because formatting is way way off for anything other than 9
                                for ($i = 1; $i <= 9; $i++) { ?>

                                    <div class="col-xs-1">
                                        <div class="btn btn-info guess" id="<?php echo $rows[$j] . $i; ?>">&nbsp;</div>
                                    </div>

                                <?php } ?>

                            </div>

                        <?php } ?>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-sm-8 col-sm-offset-2 col-lg-6 col-lg-offset-3">
            <div class="panel panel-default">
                <div class="panel-body">

                    <!-- Game Prompts Go Here -->
                    <pre><?php

                        echo "<span style='font-weight: bold; color: blue;'>&gt;&gt; Welcome to battleShip(); </span>";
                        echo "<span style='font-weight: bold;'> **press ENTER for instructions**</span>";

                        ?></pre>

                </div>
            </div>
        </div>
    </div>
</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<script src="js/app.js"></script>

</body>
</html>




