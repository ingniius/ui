APP_DIR ?= packages/alpine/playground/wire

artisan.run:
	@cd $(APP_DIR) && php artisan $(filter-out $@,$(MAKECMDGOALS))
artisan.key:
	@cd $(APP_DIR) && php artisan key:generate --ansi
artisan.migrate:
	@cd $(APP_DIR) && php artisan migrate
artisan.seed:
	@cd $(APP_DIR) && php artisan db:seed
artisan.update:
	@cd $(APP_DIR) && composer update
artisan.dry:
	@rm -rf $(APP_DIR)/vendor

changeset.add:
	@pnpm changeset add
changeset.version:
	@pnpm changeset version
changeset.publish:
	@pnpm changeset publish

composer.run:
	@composer run $(filter-out $@,$(MAKECMDGOALS))
composer.lint:
	@composer run lint
composer.test:
	@composer run test
composer.dry:
	@rm -rf .phpunit.cache vendor

turbo.run:
	@pnpm turbo $(filter-out $@,$(MAKECMDGOALS))
turbo.lint:
	@pnpm prettier ./turbo/** --write --cache --cache-location=.turbo/.prettiercache
turbo.gen:
	@pnpm turbo gen $(filter-out $@,$(MAKECMDGOALS))
turbo.dry:
	@pnpm turbo clean && rm -rf .turbo node_modules

alpine.wire:
	@pnpm turbo $(filter-out $@,$(MAKECMDGOALS)) --filter=@alpine/wire
vue.nuxt:
	@pnpm turbo $(filter-out $@,$(MAKECMDGOALS)) --filter=@vue/nuxt
vue.vite:
	@pnpm turbo $(filter-out $@,$(MAKECMDGOALS)) --filter=@vue/vite

%:
	@:
