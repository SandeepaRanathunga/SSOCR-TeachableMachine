<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="">
        <?php
            for($count=0;$count<5;$count++):
        ?>
        <label for="name">Name</label>
        <?php
            echo "<input type='text' name={$count} id=''>";
            endfor;
        ?>
    </form>
</body>
</html>