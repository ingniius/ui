<?php

declare(strict_types=1);

it('should return a successful response', function () {
    $uiJs = $this->get('/vee/ui.js');
    $uiJs->assertStatus(200);

    $uiMinJs = $this->get('/vee/ui.min.js');
    $uiMinJs->assertStatus(200);
});
